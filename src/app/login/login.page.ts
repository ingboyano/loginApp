import { Component } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage {
  username: string = '';
  password: string = '';

  constructor(private authService: AuthService, private router: Router) {}

  onLogin() {
    this.authService.login(this.username, this.password).subscribe(success => {
      if (success) {
        const userId = this.username === 'user1' ? 1 : this.username === 'user2' ? 2 : null;
        if (userId !== null) {
          localStorage.setItem('userId', userId.toString());
          this.router.navigate(['/home']);
        } else {
          alert('Login failed: Invalid user');
        }
      } else {
        alert('Login failed');
      }
    });
  }
}
