import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProductsRoutingModule } from './products-routing.module';
import { ProductsListComponent } from './products-list/products-list.component';
import { ProductsDetailComponent } from './products-detail/products-detail.component';

import { PrimengModule } from '../primeng/primeng.module';
import {TabViewModule} from 'primeng/tabview';
import {PaginatorModule} from 'primeng/paginator';
import { DisplayProductsComponent } from './display-products/display-products.component';
import { ReviewsComponent } from './reviews/reviews.component';
import { ReactiveFormsModule } from '@angular/forms';



@NgModule({
  declarations: [
    ProductsListComponent,
    ProductsDetailComponent,
    ReviewsComponent,
    DisplayProductsComponent
  ],
  imports: [
    CommonModule,
    ProductsRoutingModule,
    ReactiveFormsModule,
    TabViewModule,
    PaginatorModule,
   PrimengModule
  ]
})
export class ProductsModule { }
