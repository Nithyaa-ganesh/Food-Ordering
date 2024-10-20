import { Component, OnInit, Inject, PLATFORM_ID } from '@angular/core';
import {  Router, RouterModule } from '@angular/router';
import { CartPageComponent } from '../../pages/cart-page/cart-page.component';
import { CartService } from '../../../services/cart.service';
import { CommonModule } from '@angular/common';
import { isPlatformBrowser } from '@angular/common'; 

@Component({
  selector: 'app-header',
  standalone: true,
  imports:[RouterModule,CartPageComponent,CommonModule],
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  
  cartQuantity=0;
  isLoggedIn = false;  // Track login state
  username: string | null = null;
  constructor(public router: Router, private cartService: CartService, @Inject(PLATFORM_ID) private platformId: Object) {
    if (isPlatformBrowser(this.platformId)) {
      // Access localStorage only if running in the browser
      this.isLoggedIn = !!localStorage.getItem('isLoggedIn');
      this.username = localStorage.getItem('username') || '';
    }

    cartService.getCartObservable().subscribe((newCart) => {
      this.cartQuantity = newCart.totalCount;
    });
  }

  ngOnInit(): void {}

  private initializeUserState(): void {
    if (isPlatformBrowser(this.platformId)) {
      // Access localStorage only if running in the browser
      this.isLoggedIn = localStorage.getItem('isLoggedIn') === 'true';
      this.username = localStorage.getItem('username');
    }
  }

  openSignup(): void {
    const isMember = confirm('Already a member? Login');
    if (isMember) {
      this.router.navigate(['/login']);
    } else {
      this.router.navigate(['/signup']);
    }
  }

  logout(): void {
    if (isPlatformBrowser(this.platformId)) {
      localStorage.removeItem('isLoggedIn');
      localStorage.removeItem('username');
      this.isLoggedIn = false;
      this.username = null; // Clear the username on logout
    }
    this.router.navigate(['/']); // Redirect to home after logout
  }
  confirmLogout(): void {
    const confirmLogout = confirm('Are you sure you want to logout?');
    if (confirmLogout) {
      this.logout(); // Call the existing logout method
    }
  }
  
}