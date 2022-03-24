import { Component, OnDestroy, OnInit, ViewEncapsulation } from '@angular/core';
import { Subscription } from 'rxjs';
import { AuthService } from '../services/auth.service';
import { CartService } from '../services/cart.service';


@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class NavbarComponent implements OnInit, OnDestroy {
   name = ''
  display = false;
  // cartProducts= this.cartService.cartListener;
  totalItems = this.cartService.totalItemsListener;
  isLogin = false
  sub!: Subscription
  constructor(private cartService: CartService, private auth: AuthService) {
    this.auth.checkUser()
  }

  ngOnInit(): void {
this.auth.isAuthanticated.subscribe((userData) =>{
  this.name = userData.name;
  this.isLogin = userData.isLogin
})
    // this.sub = this.cartService.cartListener.subscribe(products => {
    //   this.cartProducts = products.length.toString()
    //   console.log(products.length.toString())
    // })
    
    // this.sub = this.cartService.cartListener.subscribe(products => {
    //   this.cartProducts = products.length.toString()
    //   console.log(products.length.toString())
    // })
  }

  ngOnDestroy(): void {
    this.sub.unsubscribe()
  }
  logout() {
    this.auth.logout()
  }
}
