import { ChangeDetectionStrategy, Component, OnDestroy, OnInit, ViewEncapsulation } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { AuthService } from '../services/auth.service';
import { CartService } from '../services/cart.service';
import { ProductsService } from '../services/products.service';


@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
  encapsulation: ViewEncapsulation.None,
  changeDetection:ChangeDetectionStrategy.OnPush
})
export class NavbarComponent implements OnInit, OnDestroy {
  name = ''
  display = false;
  // cartProducts= this.cartService.cartListener;
  totalItems = this.cartService.totalItemsListener;
  isLogin = false
  sub!: Subscription
  search = ''
  constructor(private cartService: CartService, private auth: AuthService, private router: Router, private productsSearch:ProductsService) {
    this.auth.checkUser();
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
    // this.sub.unsubscribe()
  }
  logout() {
    this.auth.logout()
    this.router.navigateByUrl('/')
  }

}
