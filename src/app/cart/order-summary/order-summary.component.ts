import { Router } from '@angular/router';
import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-order-summary',
  templateUrl: './order-summary.component.html',
  styleUrls: ['./order-summary.component.scss'],
})
export class OrderSummaryComponent implements OnInit {
  @Input() totalPrice?: number;
  isCheckout?: boolean;
  shipping = 35;
  constructor(private router: Router) {}

  ngOnInit(): void {}
  navigateToCheckout() {}
  backToShop() {
    this.router.navigate(['/products']);
  }
}
