import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { APIService } from '../services/api.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

  // Form group for registration form
  registerFormGroup: FormGroup = this.fb.group({
    emailaddress: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required, Validators.minLength(6), Validators.maxLength(16)]],
  })

  constructor(
    private router: Router, 
    private apiService: APIService, 
    private fb: FormBuilder, 
    private snackBar: MatSnackBar
  ) { 
    // Constructor for dependency 
  }

  ngOnInit(): void {
    // Initialisation logic can go here
  }

  // Called when user submits the registration form
  RegisterUser(){
    if(this.registerFormGroup.valid)
    {
      // Call API to register user
      this.apiService.RegisterUser(this.registerFormGroup.value).subscribe(() => {
        this.registerFormGroup.reset(); // Reset the form
        // Navigate to login page and show success message
        this.router.navigate(['']).then((navigated: boolean) => {
          if(navigated) {
            this.snackBar.open(`Registered successfully`, 'X', {duration: 5000});
          }
        });
      })
    }
  }

}
