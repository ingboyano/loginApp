import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from './user.service';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private isLoggedIn = false;

  constructor(private router: Router, private userService: UserService) { }

  login(username: string, password: string): Observable<boolean> {
    return this.userService.authenticate(username, password).pipe(
      tap(isAuthenticated => {
        if (isAuthenticated) {
          this.isLoggedIn = true;
          this.router.navigateByUrl('/home');
        }
      })
    );
  }

  isAuthenticated(): boolean {
    return this.isLoggedIn;
  }

  logout() {
    this.isLoggedIn = false;
    this.router.navigateByUrl('/login');
  }
}