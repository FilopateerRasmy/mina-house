import { OrderItem } from './../shared/order-item';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CartService {
  totalItems: number = 0;
  totalItemsWatcher = new BehaviorSubject(this.totalItems);
  totalItemsListener = this.totalItemsWatcher.asObservable();

  constructor() {
    if (this.getCartItems().length) {
      const totalItems = this.getCartItems().reduce(
        (a, b) => a + b.quantity,
        0
      );
      this.totalItems = totalItems;
      this.totalItemsWatcher.next(totalItems);
    }
  }
  updateNav(items: OrderItem[]) {
    this.totalItems = items.reduce((a, b) => a + b.quantity, 0);
    this.totalItemsWatcher.next(this.totalItems);
  }
  incrementItems(quantity: number) {
    this.totalItems += quantity;
    this.totalItemsWatcher.next(this.totalItems);
  }
  decrementItems(quantity: number) {
    this.totalItems -= quantity;
    this.totalItemsWatcher.next(this.totalItems);
  }
  saveCartItems(cartItem: OrderItem) {
    let cartItems: OrderItem[] = this.getCartItems();
    const existedProduct = cartItems.find(
      (item) => item.productId == cartItem.productId
    );
    if (existedProduct) {
      const index = cartItems.indexOf(existedProduct);
      cartItems[index].quantity += cartItem.quantity;
      cartItems[index].subTotal =
        cartItems[index].price * cartItems[index].quantity;
    } else {
      cartItems.push(cartItem);
    }
    localStorage.setItem('cartItems', JSON.stringify(cartItems));
    return;
  }
  getCartItems(): OrderItem[] {
    let cartItems: OrderItem[] = [];
    const storage = localStorage.getItem('cartItems');
    if (storage) {
      cartItems = JSON.parse(storage);
      return cartItems;
    }
    return cartItems;
  }
}
