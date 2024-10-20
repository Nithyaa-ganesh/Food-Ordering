// order.service.ts
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Order } from '../shared/models/Order';

@Injectable({
  providedIn: 'root',
})
export class OrderService {
  private orderSubject = new BehaviorSubject<Order | null>(null);
  order$ = this.orderSubject.asObservable();

  setOrder(order: Order) {
    this.orderSubject.next(order);
  }

  getOrder(): Order | null {
    return this.orderSubject.getValue();
  }
}
