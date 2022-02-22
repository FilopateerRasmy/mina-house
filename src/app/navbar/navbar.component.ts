import { Component, OnDestroy, OnInit, ViewEncapsulation } from '@angular/core';
import { Subscription } from 'rxjs';
import { CartService } from '../services/cart.service';
import { IProduct } from '../shared/products';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
  encapsulation:ViewEncapsulation.None
})
export class NavbarComponent implements OnInit, OnDestroy {
  display= false;
  cartProducts!:string;
  sub!:Subscription
  constructor(private cartService:CartService) { 
 
  }

  ngOnInit(): void {
  this.sub =  this.cartService.cartListener.subscribe(products => {
      this.cartProducts = products.length.toString()
      console.log(products.length.toString())
    })
  }

  ngOnDestroy(): void {
      this.sub.unsubscribe()
  }

}
