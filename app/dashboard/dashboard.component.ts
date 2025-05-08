import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit, OnDestroy {
  private intervalId: any;

  constructor(public authService: AuthService, private router: Router) {}

  ngOnInit() {
    // Poll every second to check if the user is still logged in
    this.intervalId = setInterval(() => {
      if (!this.authService.isLoggedIn()) {
        this.router.navigate(['/login']);
      }
    }, 1000);
  }

  logout() {
    this.authService.logout();
  }

  ngOnDestroy() {
    clearInterval(this.intervalId);
  }
}