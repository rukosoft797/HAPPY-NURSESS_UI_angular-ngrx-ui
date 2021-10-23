import { Injectable } from '@angular/core';
import { User } from './user';
@Injectable({
  providedIn: 'root'
})

export class AuthService {

  currentUser: User | null = null;
  redirectUrl: string = '';

  
  constructor() { }

  isLoggedIn(): boolean {
    return !!this.currentUser;
  }

  login(userName: string, password: string): void {
    // Will be replaced KeyCloack logic
    this.currentUser = {
        id: 2,
        userName,
        isAdmin: false
    };
  }

  logout(): void {
      this.currentUser = null;
  }

}
