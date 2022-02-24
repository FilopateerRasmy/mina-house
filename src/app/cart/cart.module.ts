import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CartListComponent } from './cart-list/cart-list.component';
import {  RouterModule, Routes } from '@angular/router';
import { PrimengModule } from '../primeng/primeng.module';

const route:Routes = [{path:'cart', component:CartListComponent}]

@NgModule({
  declarations: [
    CartListComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(route),
    PrimengModule
  ]
})
export class CartModule { }
