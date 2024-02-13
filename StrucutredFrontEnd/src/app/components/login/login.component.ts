// src/app/login/login.component.ts
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent {
  loginForm: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private router: Router
  ) {
    this.loginForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
    });
  }

  onSubmit(): void {
    if (this.loginForm.valid) {
      const { email, password } = this.loginForm.value; // Extract email and password from the form
      this.authService.loginUser(email, password).subscribe(
        (response: { token: string }) => {
          // Login successful, store the token in localStorage
         // localStorage.setItem('token', response.token);
          alert('Login successful');
          // Redirect to the dashboard or any other route
          this.router.navigate(['/company']);
        },
        (error: any) => {
          // Handle login error
          console.error('Login error', error);
          // Display an error message to the user, e.g., using Angular Material Snackbar
        }
      );
    }
  }
}
