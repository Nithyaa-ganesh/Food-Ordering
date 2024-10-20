import { Component, OnInit, Inject, PLATFORM_ID } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { Order } from '../../../shared/models/Order'; // Adjust the import path as needed
import { CartService } from '../../../services/cart.service'; // Import your CartService to retrieve cart items
import { isPlatformBrowser } from '@angular/common'; 

@Component({
  selector: 'app-payment-page',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './payment.component.html',
  styleUrls: ['./payment.component.css']
})
export class PaymentPageComponent implements OnInit {
  paymentForm!: FormGroup;
  isCreditCardSelected = true; // Default payment method
  isUpiSelected = false;
  order: Order = new Order(); // Initialize the order

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private cartService: CartService,
    @Inject(PLATFORM_ID) private platformId: Object // Inject PLATFORM_ID
  ) {}

  ngOnInit(): void {
    this.paymentForm = this.formBuilder.group({
      cardNumber: [''],
      expiryDate: [''],
      cvv: [''],
      upiType: ['gpay'], // Default UPI type
      upiId: ['']
    });

    // Initialize the order with cart items and total price
    const cart = this.cartService.getCart(); // Fetch cart items from CartService
    this.order.items = cart.items; // Assign items to order
    this.order.totalPrice = cart.totalPrice; // Assign total price
  }

  onPaymentMethodChange(method: string): void {
    this.isCreditCardSelected = method === 'creditCard';
    this.isUpiSelected = method === 'upi';
    
    // Reset form controls based on the selected payment method
    if (this.isCreditCardSelected) {
      this.paymentForm.get('upiId')?.reset();
    } else if (this.isUpiSelected) {
      this.paymentForm.get('cardNumber')?.reset();
      this.paymentForm.get('expiryDate')?.reset();
      this.paymentForm.get('cvv')?.reset();
    } else {
      this.paymentForm.reset(); // Clear the form for COD
    }
  }

  completePayment(): void {
    console.log('Payment form value:', this.paymentForm.value);

    // Create a new order object without the existing id property
    const { id, ...orderWithoutId } = this.order; // Destructure to remove the id if it exists
    const orderWithId = {
      id: this.generatePaymentId(), // Generate a new payment ID
      ...orderWithoutId // Spread the rest of the order properties
    };

    // Store the order in localStorage if in the browser
    if (isPlatformBrowser(this.platformId)) {
      localStorage.setItem('orders', JSON.stringify([orderWithId]));
    }

    // Navigate to the Order Confirmation page
    console.log('Navigating to Order Confirmation page');
    this.router.navigate(['/orderconfirmation']);
}


  
  generatePaymentId(): string {
    // Example of generating a unique payment ID
    return 'PAY-' + Math.random().toString(36).substr(2, 9).toUpperCase();
  }
}
