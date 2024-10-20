import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';
import { Router } from '@angular/router';
@Component({
  selector: 'app-orderconfirmation',
  standalone: true,
  imports: [CommonModule,RouterModule],
  templateUrl: './orderconfirmation.component.html',
  styleUrls: ['./orderconfirmation.component.css']
})
export class OrderconfirmationComponent implements OnInit {
  confirmationMessage: string = 'Thank you for your order! Your payment was successful.';

  constructor(private router:Router) {}
  goBack(): void {
    this.router.navigate(['/']);

}
ngOnInit() {
  console.log('Order Confirmation component loaded');
}
}
