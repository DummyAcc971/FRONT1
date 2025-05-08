import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

// Import your page components
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { SignupComponent } from './signup/signup.component';
import { DashboardComponent } from './dashboard/dashboard.component';

const routes: Routes = [
  // Default route (when URL is just '/')
  { path: '', component: HomeComponent },

  // Other specific routes
  { path: 'login', component: LoginComponent },
  { path: 'signup', component: SignupComponent },
  { path: 'dashboard', component: DashboardComponent },

  // Optional: Routes for other nav links if you build them
  // { path: 'market', component: MarketComponent },
  // { path: 'analytics', component: AnalyticsComponent },
  // { path: 'contact', component: ContactComponent },

  // Wildcard route for 404 Not Found - redirects to home
  { path: '**', redirectTo: '', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }