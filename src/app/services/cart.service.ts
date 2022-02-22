import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { IProduct } from '../shared/products';

@Injectable({
  providedIn: 'root'
})
export class CartService {

cart:IProduct[] = []

cartWatcher = new BehaviorSubject(this.cart);
cartListener = this.cartWatcher.asObservable()

  constructor() { }


  addToCart(product:IProduct){
    this.cart.push(product);
    this.cartWatcher.next(this.cart)
    console.log(this.cart)
  }
}
