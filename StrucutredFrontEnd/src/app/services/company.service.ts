// src/app/services/company.service.ts
import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, catchError, throwError } from 'rxjs';
import { Company } from '../model/company.model';
import { HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class CompanyService {
  private apiUrl = 'http://localhost:3000';

  constructor(private http: HttpClient) {}

  // createCompany(company: Company): Observable<Company> {
  //   return this.http.post<Company>(`${this.apiUrl}/company/create`, company);
  // }
  createCompany(company: Company): Observable<Company> {
    // Retrieve the token from localStorage
    const authToken = localStorage.getItem('authToken');
  
    // Check if the token is available
    if (!authToken) {
      // Handle the case where the token is missing
      console.error('Authentication token is missing.');
      // You may want to redirect the user to the login page or handle it according to your application's logic.
      return throwError('Authentication token is missing.');
    }
  
    // Include the token in the request headers
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + authToken,
    });
  
    return this.http.post<Company>(`${this.apiUrl}/company/create`, company, { headers }).pipe(
      catchError((error: HttpErrorResponse) => {
        if (error.status === 401) {
          // Handle unauthorized access (e.g., redirect to login page)
        } else {
          // Handle other errors
          console.log(authToken);
        }
        return throwError(error);
      })
    );
  }

  getCompanyById(companyId: string): Observable<Company> {
    const authToken = localStorage.getItem('authToken');
  
    // Check if the token is available
    if (!authToken) {
      // Handle the case where the token is missing
      console.error('Authentication token is missing.');
      // You may want to redirect the user to the login page or handle it according to your application's logic.
      return throwError('Authentication token is missing.');
    }
  
    // Include the token in the request headers
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + authToken,
    });
    return this.http.get<Company>(`${this.apiUrl}/company/get/${companyId}`,{headers});
  }

  getAllCompanies(): Observable<Company[]> {
    const authToken = localStorage.getItem('authToken');
  
    // Check if the token is available
    if (!authToken) {
      // Handle the case where the token is missing
      console.error('Authentication token is missing.');
      // You may want to redirect the user to the login page or handle it according to your application's logic.
      return throwError('Authentication token is missing.');
    }
  
    // Include the token in the request headers
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + authToken,
    });

    const options = { headers: headers };
    return this.http.get<Company[]>(`${this.apiUrl}/company/getAll`, options).pipe(
      catchError((error: HttpErrorResponse) => {
        if (error.status === 401) {
          // Handle unauthorized access (e.g., redirect to login page)
        } else {
          // Handle other errors
          console.log(authToken);
        }
        return throwError(error);
      })
    );
  }

 

  updateCompany(companyId: string, updateData: any): Observable<Company> {
    const authToken = localStorage.getItem('authToken');
  
    // Check if the token is available
    if (!authToken) {
      // Handle the case where the token is missing
      console.error('Authentication token is missing.');
      // You may want to redirect the user to the login page or handle it according to your application's logic.
      return throwError('Authentication token is missing.');
    }
  
    // Include the token in the request headers
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + authToken,
    });

    const options = { headers: headers };
   
    return this.http.put<Company>(`${this.apiUrl}/company/update/${companyId}`, updateData,options).pipe(
      catchError((error: HttpErrorResponse) => {
        if (error.status === 401) {
          // Handle unauthorized access (e.g., redirect to login page)
        } else {
          // Handle other errors
          console.log(authToken);
        }
        return throwError(error);
      })
    );
  }


  deleteCompany(companyId: string): Observable<any> {
    const authToken = localStorage.getItem('authToken');
  
    // Check if the token is available
    if (!authToken) {
      // Handle the case where the token is missing
      console.error('Authentication token is missing.');
      // You may want to redirect the user to the login page or handle it according to your application's logic.
      return throwError('Authentication token is missing.');
    }
  
    // Include the token in the request headers
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + authToken,
    });

    return this.http.delete<any>(`${this.apiUrl}/company/delete/${companyId}`,{headers});
  }
}
