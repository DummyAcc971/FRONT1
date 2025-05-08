import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms'; // <-- IMPORT FormsModule
 // <-- IMPORT HttpClientModule

import { AppRoutingModule } from './app-routing.module'; // Should be auto-imported
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component'; // Import components
import { LoginComponent } from './login/login.component';
import { SignupComponent } from './signup/signup.component';
import { DashboardComponent } from './dashboard/dashboard.component';

@NgModule({
  declarations: [ // <-- DECLARE your components here
    AppComponent,
    HomeComponent,
    LoginComponent,
    SignupComponent,
    DashboardComponent
  ],
  imports: [ // <-- Add FormsModule here
    BrowserModule,
    AppRoutingModule, // Comes from --routing flag
    FormsModule,
     // <-- Add HttpClientModule here
       // Add for ngModel
  ],
  providers: [],
  bootstrap: [AppComponent] // Keep AppComponent as the bootstrap component
})
export class AppModule { }