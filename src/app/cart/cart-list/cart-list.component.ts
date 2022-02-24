import { IProduct } from 'src/app/shared/products';
import { Component, OnInit } from '@angular/core';
import { CartService } from 'src/app/services/cart.service';

@Component({
  selector: 'app-cart-list',
  templateUrl: './cart-list.component.html',
  styleUrls: ['./cart-list.component.scss']
})
export class CartListComponent implements OnInit {
  cartList:IProduct[] = []

  constructor(private cartService: CartService) { }

  ngOnInit(): void {
    this.cartList= this.cartService.cart;
    console.log(this.cartList);  
  }

remove(product:IProduct){
  console.log(product);
  // let itemIndex= this.cartList.findIndex(prod=>prod==product);
  let itemIndex= this.cartList.indexOf(product);
  this.cartList.splice(itemIndex,1);
  this.cartService.cartWatcher.next(this.cartList)
}
}
