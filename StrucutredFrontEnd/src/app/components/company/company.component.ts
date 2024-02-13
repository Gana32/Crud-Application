import { Component, OnInit } from '@angular/core';
import { Company } from '../../model/company.model';
import { CompanyService } from '../../services/company.service';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-company',
  templateUrl: './company.component.html',
  styleUrl: './company.component.css'
})
export class CompanyComponent implements OnInit  {

  companies: Company[] = [];

  constructor(private companyService: CompanyService,private router:Router,private authService:AuthService) { }

  ngOnInit(): void {
    this.getCompanies();
  }
  

  getCompanies(): void {
    this.companyService.getAllCompanies().subscribe(
      (data: Company[]) => {
        this.companies = data;
      },
      (error) => {
        console.error('Error fetching companies:', error);
      }
    );
  }

  updateCompany(companyId: string  | undefined): void {

    console.log('companyId:', companyId);
    // Redirect to the update component with the companyId as a parameter
    if (companyId) {
      this.router.navigate(['/update-company', companyId]);
    } else {
      console.error('companyId is undefined. Unable to navigate.');
    }
   // this.router.navigate(['/update-company', companyId]);
  }

  deleteCompany(companyId: string | undefined): void {
    if (!companyId) {
      console.error('companyId is undefined. Cannot delete.');
      return;
    }

    if (confirm('Are you sure you want to delete this company?')) {
      this.companyService.deleteCompany(companyId).subscribe(
        () => {
          console.log('Company deleted successfully.');
          // Optionally, you can refresh the company list or perform other actions after deletion
          this.getCompanies();
        },
        (error) => {
          console.error('Error deleting company:', error);
          // Handle the error appropriately (show a message, log, etc.)
        }
      );
    }
  }

  logout() {
    console.log('Logging out');
    this.authService.logoutUser();
  }
  
}
