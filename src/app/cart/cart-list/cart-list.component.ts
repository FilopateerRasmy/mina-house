import { Router } from '@angular/router';
import { OrderItem } from './../../shared/order-item';
import { Component, OnInit } from '@angular/core';
import { CartService } from 'src/app/services/cart.service';

@Component({
  selector: 'app-cart-list',
  templateUrl: './cart-list.component.html',
  styleUrls: ['./cart-list.component.scss'],
})
export class CartListComponent implements OnInit {
  storedItems: OrderItem[] = [];
  totalPrice?: number;
  quantity: number = 1;
  constructor(private cartService: CartService, private router: Router) {}

  ngOnInit(): void {
    this.calcTotalPrice();
    this.storedItems = this.cartService.getCartItems();
  }

  calcTotalPrice() {
    const storage = this.cartService.getCartItems();
    // a : accumulator, b : items value, 0 : accumulator value
    const totalPrice = storage.reduce((a, b) => {
      return a + b.price * b.quantity;
    }, 0);
    this.totalPrice = totalPrice;
  }
  removeFromCart(product: OrderItem) {
    let cartItems: OrderItem[] = this.cartService.getCartItems();
    const productIndex = cartItems.findIndex(
      (item) => item.product == product.product
    );
    cartItems.splice(productIndex, 1);
    this.storedItems = cartItems;
    this.cartService.decrementItems(product.quantity);
    localStorage.setItem('cartItems', JSON.stringify(cartItems));
    this.calcTotalPrice();
  }
  changeQuantity(e: any, product: OrderItem) {
    this.quantity = Number(e);
    const storage = this.cartService.getCartItems();
    // console.log(storage);

    const productIndex = storage.findIndex(
      (item) => item.product == product.product
    );
    // console.log(productIndex);
    // console.log(product);

    this.storedItems[productIndex].quantity = Number(e);
    this.storedItems[productIndex].subTotal = Number(e) * product.price;
    localStorage.setItem('cartItems', JSON.stringify(this.storedItems));
    this.calcTotalPrice();
    this.cartService.updateNav(this.storedItems);
  }
  backToShop() {
    this.router.navigate(['/products']);
  }
}
