import { OrderService } from './../../services/order.service';
import { OrderItem } from './../../shared/order-item';
import { CartService } from 'src/app/services/cart.service';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { DashboardService } from './../../services/dashboard.service';
import { Router } from '@angular/router';
import { Order } from 'src/app/shared/order';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.scss'],
})
export class CheckoutComponent implements OnInit {
  phone = new FormControl(null, [
    Validators.required,
    Validators.minLength(11),
    Validators.maxLength(11),
  ]);
  street = new FormControl('', [Validators.required]);
  city = new FormControl('', [Validators.required]);

  checkoutForm = this.fb.group({
    address: this.fb.group({
      street: this.street,
      city: this.city,
    }),
    phone: this.phone,
  });
  constructor(
    private router: Router,
    private fb: FormBuilder,
    private userService: DashboardService,
    private cartService: CartService,
    private orderService: OrderService
  ) {}

  ngOnInit(): void {
    this.userService.getUserID();
    this.getUserData();
  }
  backToCart() {
    this.router.navigate(['/cart']);
  }
  getUserData() {
    this.userService.getUser(this.userService.userID).subscribe({
      next: (res) => {
        const { phone, address } = res.user;
        this.checkoutForm.setValue({ phone, address });
      },
      error: (err: any) => {
        console.log(err);
      },
    });
  }

  createOrder() {
    const order: Order = {
      orderItems: this.cartService.getCartItems(),
      ...this.checkoutForm.value,
    };
    console.log(order);

    this.orderService.createOrder(order).subscribe({
      next: (res) => {
        console.log(res);
      },
      error: (err) => {
        console.log(err.error.msg);
      },
    });
  }
}
