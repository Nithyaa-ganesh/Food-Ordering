import { Component, OnInit } from '@angular/core';
import { Order } from '../../../shared/models/Order';
import { CommonModule } from '@angular/common';
import { OrderitemListComponent } from '../../partials/orderitem-list/orderitem-list.component';
import { TitleComponent } from '../../partials/title/title.component';
import { OrderService } from '../../../services/order.service';

@Component({
  selector: 'app-orders',
  standalone: true,
  imports: [CommonModule,OrderitemListComponent],
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.css']
})
export class OrderPageComponent implements OnInit {
  order: Order | null = null;
   // Initialize order as null
   constructor(private orderService: OrderService) { }

   ngOnInit(): void {
    const orderData = localStorage.getItem('order');
    if (orderData) {
      this.order = JSON.parse(orderData);
    } else {
      this.order = null; // No order found
    }
  }
  
}