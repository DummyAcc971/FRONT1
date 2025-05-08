import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { AuthService } from '../auth.service'; // <-- Import AuthService

@Component({
  selector: 'app-signup',
  standalone: true,
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css'],
  imports: [FormsModule, RouterModule],
})
export class SignupComponent {
  username = '';
  email = '';
  password = '';

  constructor(
    private router: Router,
    private http: HttpClient,
    private authService: AuthService // <-- Inject AuthService here
  ) {}

  signUp() {
    this.authService.signUp(this.username, this.email, this.password).subscribe({
      next: () => {
        alert('Signup successful! Please log in.');
        this.router.navigate(['/login']);
      },
      error: (err) => {
        alert(err.error.message || 'Signup failed.');
      }
    });
  }
}