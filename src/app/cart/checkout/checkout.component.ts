import { OrderService } from './../../services/order.service';
import { CartService } from 'src/app/services/cart.service';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { DashboardService } from './../../services/dashboard.service';
import { Router } from '@angular/router';
import { Order } from 'src/app/shared/order';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.scss'],
  providers: [MessageService],
})
export class CheckoutComponent implements OnInit {
  phone = new FormControl(null, [
    Validators.required,
    Validators.pattern(/^01[0|1|2|5][0-9]{8}$/),
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
    private orderService: OrderService,
    private messageService: MessageService
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
        this.messageService.add({
          severity: 'success',
          summary: 'Order has been created, hope to see you again',
        });
        localStorage.removeItem('cartItems');
        this.cartService.updateNav([]);
        this.router.navigate(['/']);
      },
      error: (err) => {
        console.log(err.error.msg);
      },
    });
  }
}
