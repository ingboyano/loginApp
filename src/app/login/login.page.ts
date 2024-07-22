import { Component } from '@angular/core';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage {
  username: string = '';
  password: string = '';

  constructor(private authService: AuthService) {}

  onLogin() {
    const success = this.authService.login(this.username, this.password);
    if (!success) {
      alert('Login failed');
    }
  }
}