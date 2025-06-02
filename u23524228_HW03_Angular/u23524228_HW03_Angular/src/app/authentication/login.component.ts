import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { APIService } from '../services/api.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  // Form group for login form
  loginFormGroup: FormGroup = this.fb.group({
    emailaddress: ['', [Validators.required, Validators.email]],
    password: ['', Validators.required],
  })

  isLoading:boolean = false // Loading shwoing thing 

  constructor(
    private router: Router, 
    private apiService: APIService, 
    private fb: FormBuilder, 
    private snackBar: MatSnackBar
  ) { }

  ngOnInit(): void {
    
  }

  // Called when user submits the login form
  async LoginUser(){
    if(this.loginFormGroup.valid)
    {
      this.isLoading = true // Show loading spinner thing 

      // Call API to log in user
      await this.apiService.LoginUser(this.loginFormGroup.value).subscribe(result => {
        // Store user info in local storage
        localStorage.setItem('User', JSON.stringify(result))
        this.loginFormGroup.reset(); // Reset the form
        this.router.navigateByUrl('productListing'); // Redirect to product listing page
      })
    }
  }

}
