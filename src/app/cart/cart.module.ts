import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CartListComponent } from './cart-list/cart-list.component';
import {  RouterModule, Routes } from '@angular/router';
import { PrimengModule } from '../primeng/primeng.module';
import { AuthGuard } from '../gaurds/auth.guard';

const route:Routes = [{path:'cart', component:CartListComponent, canActivate:[AuthGuard]}]

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
