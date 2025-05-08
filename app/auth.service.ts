import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private loginUrl = 'http://localhost:5125/api/users/login'; // Update with your backend URL
  private signupUrl = 'http://localhost:5125/api/users/signup'; // Backend signup endpoint

  constructor(private http: HttpClient, private router: Router) {}

  login(username: string, password: string) {
    return this.http.post<{ token: string }>(this.loginUrl, { username, password });
  }

  signUp(username: string, email: string, password: string): Observable<{ message: string }> {
    return this.http.post<{ message: string }>(this.signupUrl, {
      username,  // Include the username parameter here
      email,
      password
    });
  }
  

  // Set the authentication token in the session storage
  setToken(token: string) {
    sessionStorage.setItem('authToken', token);
  
    // Decode JWT and set logout timer
    const payload = JSON.parse(atob(token.split('.')[1]));
    const exp = payload.exp * 1000; // JWT exp is in seconds
    const timeout = exp - Date.now();
  
    if (timeout > 0) {
      setTimeout(() => {
        this.logout();
        alert('Session expired. Please log in again.');
      }, timeout);
    }
  }

  getToken(): string | null {
    return sessionStorage.getItem('authToken');
  }

  isLoggedIn(): boolean {
    return !!this.getToken();
  }

  logout() {
    sessionStorage.removeItem('authToken');
    this.router.navigate(['/login']);
  }
}
