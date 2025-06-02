import { Component } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
  standalone: false,
})
export class LoginPage {
  email = '';
  password = '';
  isSignUpMode = false; // Toggle between login and signup modes
  errorMessage = ''; // To display error messages

  constructor(private authService: AuthService, private router: Router) {}

  toggleMode() {
    this.isSignUpMode = !this.isSignUpMode;
    this.errorMessage = ''; // Clear error message when switching modes
  }

  onSubmit() {
    if (!this.email || !this.password) {
      this.errorMessage = 'Please enter both email and password.';
      return;
    }

    if (this.isSignUpMode) {
      const isSignedUp = this.authService.signUp(this.email, this.password);
      if (isSignedUp) {
        this.errorMessage = '';
        alert('Sign-up successful! Please log in.');
        this.isSignUpMode = false; // Switch to login mode after successful sign-up
      } else {
        this.errorMessage = 'User already exists. Please log in.';
      }
    } else {
      const isLoggedIn = this.authService.login(this.email, this.password);
      if (isLoggedIn) {
        this.errorMessage = '';
        localStorage.setItem('isLoggedIn', 'true'); // Set login status in local storage
        this.router.navigate(['/home']); // Navigate to teh home page on successful login
      } else {
        this.errorMessage = 'User not found. Please sign up first.'; // Display error if user is not signed up
      }
    }
  }
}