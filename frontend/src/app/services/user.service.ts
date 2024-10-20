import { Injectable } from '@angular/core';

export interface User {
  username: string;
  email: string;
}

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private user: User | null = null;

  constructor() {
    // Check if localStorage is available
    if (typeof window !== 'undefined') {
      // Load user from localStorage if it exists
      const username = localStorage.getItem('username');
      const email = localStorage.getItem('email');
      if (username && email) {
        this.user = { username, email };
      }
    }
  }

  public get currentUser(): User | null {
    return this.user;
  }

  setUser(username: string, email: string): void {
    this.user = { username, email };
    if (typeof window !== 'undefined') { // Check for localStorage availability
      localStorage.setItem('username', username);
      localStorage.setItem('email', email);
      localStorage.setItem('isLoggedIn', 'true');
    }
  }

  getUser(): User | null {
    return this.user;
  }

  logout(): void {
    this.user = null;
    if (typeof window !== 'undefined') { // Check for localStorage availability
      localStorage.removeItem('username');
      localStorage.removeItem('email');
      localStorage.removeItem('isLoggedIn');
    }
  }
}
