import { Component, OnInit } from '@angular/core';
import { Order } from '../../../shared/models/Order';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { CartService } from '../../../services/cart.service';
import { UserService } from '../../../services/user.service';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { OrderitemListComponent } from '../../partials/orderitem-list/orderitem-list.component';
import { TitleComponent } from "../../partials/title/title.component";
import { OrderService } from '../../../services/order.service';
@Component({
  selector: 'app-checkout-page',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule, OrderitemListComponent, TitleComponent],
  templateUrl: './checkout-page.component.html',
  styleUrls: ['./checkout-page.component.css']
})
export class CheckoutPageComponent implements OnInit {
  order: Order = new Order();
  checkoutForm!: FormGroup;
  successMessage: string | null = null; // Message to display upon success
  errorMessage: string | null = null; // Message to display upon error

  constructor(
    private cartService: CartService,
    private formBuilder: FormBuilder,
    private userService: UserService,
    private router: Router,
    private orderService: OrderService 
  ) {
    const cart = cartService.getCart();
    this.order.items = cart.items;
    this.order.totalPrice = cart.totalPrice;
  }

  ngOnInit(): void {
    // Retrieve user info from the UserService
    const currentUser = this.userService.currentUser;

    // If no user, set an empty string; otherwise, use the logged-in user's data
    const username = currentUser?.username || ''; // Prefill username if available
    const address = ''; // You can later set this from a more specific user address source

    // Initialize the form with defaults
    this.checkoutForm = this.formBuilder.group({
      name: [username, Validators.required], // Prefill with username
      address: [address, Validators.required] // Empty field for address
    });
  }

  get fc() {
    return this.checkoutForm.controls;
  }

  createOrder(): void {
    // Validate form inputs
    if (this.checkoutForm.invalid) {
      this.errorMessage = 'Please fill in the required fields'; // Set error message
      return;
    }

    // Set the order details from the form
    this.order.name = this.fc.name.value;
    this.order.address = this.fc.address.value;
    this.orderService.setOrder(this.order);

    // Log or send the order data to your backend
    console.log(this.order);

    // Show a success message and navigate
    this.successMessage = 'Order placed successfully!'; // Set success message
    setTimeout(() => {
      this.successMessage = null; // Clear the message after a delay
    }, 3000); // Message will disappear after 3 seconds

    this.router.navigate(['/payment']);
    localStorage.setItem('order', JSON.stringify(this.order));
 // Redirect to home page or orders page
  }
}
