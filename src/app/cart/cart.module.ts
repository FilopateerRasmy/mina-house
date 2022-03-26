import { InputComponent } from './input/input.component'
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CartListComponent } from './cart-list/cart-list.component';
import { RouterModule, Routes } from '@angular/router';
import { PrimengModule } from '../primeng/primeng.module';
import { AuthGuard } from '../gaurds/auth.guard';
import { OrderSummaryComponent } from './order-summary/order-summary.component';
import { CheckoutComponent } from './checkout/checkout.component';

const route: Routes = [
  { path: 'cart', component: CartListComponent, canActivate: [AuthGuard] },
  { path: 'checkout', component: CheckoutComponent, canActivate: [AuthGuard] },
];

@NgModule({
  declarations: [CartListComponent, OrderSummaryComponent, CheckoutComponent,InputComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(route),
    PrimengModule,
    FormsModule,
    ReactiveFormsModule,
  ],
  
})
export class CartModule {}
