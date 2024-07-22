import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private users = [
    { username: 'user1', password: 'password1' },
    { username: 'user2', password: 'password2' }
  ];

  private isLoggedIn = false;

  constructor(private router: Router) { }

  login(username: string, password: string): boolean {
    const user = this.users.find(u => u.username === username && u.password === password);
    if (user) {
      this.isLoggedIn = true;
      this.router.navigateByUrl('/home');
      return true;
    } else {
      return false;
    }
  }

  isAuthenticated(): boolean {
    return this.isLoggedIn;
  }

  logout() {
    this.isLoggedIn = false;
    this.router.navigateByUrl('/login');
  }
}