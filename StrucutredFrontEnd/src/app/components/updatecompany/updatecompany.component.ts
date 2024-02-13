import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CompanyService } from '../../services/company.service';
import { Company } from '../../model/company.model';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-updatecompany',
  templateUrl: './updatecompany.component.html',
  styleUrl: './updatecompany.component.css'
})
export class UpdatecompanyComponent implements OnInit  {

  companyId: string;
  company: Company= { name: '', industry: '', location: '' };
 
  constructor(private route:ActivatedRoute, private companyService:CompanyService,private router:Router,private authService:AuthService){}
  ngOnInit(): void {
    this.companyId = this.route.snapshot.paramMap.get('id');
    console.log('Id is fetched correctly',this.companyId);

    this.companyService.getCompanyById(this.companyId).subscribe(
      (data: Company) => {
        this.company = data;
      },
      (error) => {
        console.error('Error fetching company details:', error);
      }
    );
  }
  getCompanyDetails(companyId: string): void {
    this.companyService.getCompanyById(companyId).subscribe(
      (companyDetails: Company) => {
        this.company = companyDetails;
        console.log('Fetched company details successfully:', this.company);
      },
      error => {
        console.error('Error fetching company details:', error);
      }
    );
  }

  updateCompany(): void {
    this.companyService.updateCompany(this.companyId, this.company).subscribe(
      (updatedCompany: Company) => {
        console.log('Company updated successfully:', updatedCompany);
        // Optionally, navigate to a different component or handle success accordingly
        this.router.navigate(['/company']);
      },
      (error) => {
        console.error('Error updating company:', error);
        // Handle error accordingly
      }
    );
  }

  logout() {
    this.authService.logoutUser();
  }
  }



