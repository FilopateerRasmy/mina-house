import { CartService } from './../../../services/cart.service';
import { OrderService } from './../../../services/order.service';
import { Component, OnInit } from '@angular/core';
import { Order } from 'src/app/shared/order';

@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.scss'],
})
export class OrdersComponent implements OnInit {
  constructor(
    private orderService: OrderService,
    private cartService: CartService
  ) {}
  orders?: Order[];
  isLoading: boolean = true;
  ngOnInit(): void {
    this.orderService.getUserOrders().subscribe({
      next: (orders) => {
        this.orders = orders;
        console.log(orders);
        this.isLoading = false;
      },
    });
  }
}
