import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private currentUser: string | null = null;

  constructor() {
    // Load the current user from local storage on service initialization
    this.currentUser = localStorage.getItem('currentUser');
  }

  signUp(email: string, password: string): boolean {
    const users = this.getUsers();
    if (users[email]) {
      return false; // User already exists
    }
    users[email] = password;
    this.saveUsers(users); // Save updated users to local storage
    return true;
  }

  login(email: string, password: string): boolean {
    const users = this.getUsers();
    if (users[email] === password) {
      this.currentUser = email;
      localStorage.setItem('currentUser', email); // Save the current user to local storage
      return true;
    }
    return false;
  }

  logout(): void {
    this.currentUser = null;
    localStorage.removeItem('currentUser'); // Remove the current user from local storage
  }

  isLoggedIn(): boolean {
    return this.currentUser !== null;
  }

  private getUsers(): { [email: string]: string } {
    const users = localStorage.getItem('users');
    return users ? JSON.parse(users) : {}; // Parse users from local storage or return an empty object
  }

  private saveUsers(users: { [email: string]: string }): void {
    localStorage.setItem('users', JSON.stringify(users)); // Save users to local storage
  }
}