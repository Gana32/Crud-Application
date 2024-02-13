import { Component } from '@angular/core';
import { CompanyService } from '../../services/company.service';
import { Company} from '../../model/company.model'
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-createcompany',
  templateUrl: './createcompany.component.html',
  styleUrl: './createcompany.component.css'
})
export class CreatecompanyComponent {

  company: Company = { name: '', industry: '', location: '' };

  constructor(private companyService: CompanyService, private router:Router,private authService:AuthService) {}

  createCompany() {
    this.companyService.createCompany(this.company).subscribe(
      createdCompany => {
        console.log('Company created successfully with ID:', createdCompany._id);
        console.log('Company created successfully:', createdCompany);
        // Optionally, you can reset the form or perform other actions here
        this.router.navigate(['/company']);
      },
      error => {
      
        console.error('Error creating company:', error);
        // Handle the error appropriately (show a message, log, etc.)
      }
    );
  }
  logout() {
    this.authService.logoutUser();
  }
}
