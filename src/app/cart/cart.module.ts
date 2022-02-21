import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CartListComponent } from './cart-list/cart-list.component';
import {  RouterModule, Routes } from '@angular/router';

const route:Routes = [{path:'cart', component:CartListComponent}]

@NgModule({
  declarations: [
    CartListComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(route)
  ]
})
export class CartModule { }
