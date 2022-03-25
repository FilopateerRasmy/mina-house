import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { DashboardService } from './../../services/dashboard.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.scss'],
})
export class CheckoutComponent implements OnInit {

  userName: string = '';
  userEmail: string = '';
  userStreet: string = '';
  userCity: string = '';
  userPhone: string = '';
  checkoutForm = this.fb.group({
    address: this.fb.group({
      street: [this.userStreet, Validators.required],
      city: [this.userCity, Validators.required],
    }),
    phone: [
      this.userPhone,
      [Validators.required, Validators.minLength(11), Validators.maxLength(11)],
    ],
  });
  constructor(
    private router: Router,
    private fb: FormBuilder,
    private userService: DashboardService
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
        this.userName = res.user.name;
        this.userEmail = res.user.email;
        this.userPhone = res.user.phone;
        this.userStreet = res.user.address.street;
        this.userCity = res.user.address.city;
      },
      error: (err: any) => {
        console.log(err);
      },
    });
  }

  get phone() {
    return this.checkoutForm.controls['phone'];
  }
  get street() {
    return this.checkoutForm.controls['street'];
  }
  get city() {
    return this.checkoutForm.controls['city'];
  }

  // createOrder() {
  //   const order: Order = {
  //     orderItems:
  //     city: this.checkoutForm.city.value,
  //     country: this.checkoutForm.country.value,
  //     phone: this.checkoutForm.phone.value,
  //   };
  // }
  placeOrder() {}
}
