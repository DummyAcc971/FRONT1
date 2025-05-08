import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component'; // Import standalone component
import { LoginComponent } from './login/login.component'; // Import standalone component
import { SignupComponent } from './signup/signup.component'; // Import standalone component
import { DashboardComponent } from './dashboard/dashboard.component'; // Import standalone component

export const routes: Routes = [
  { path: '', component: HomeComponent }, // Use standalone component directly
  { path: 'login', component: LoginComponent }, // Use standalone component directly
  { path: 'signup', component: SignupComponent }, // Use standalone component directly
  { path: 'dashboard', component: DashboardComponent }, // Use standalone component directly
  { path: '**', redirectTo: '', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
