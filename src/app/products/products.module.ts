import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProductsRoutingModule } from './products-routing.module';
import { ProductsListComponent } from './products-list/products-list.component';
import { ProductsDetailComponent } from './products-detail/products-detail.component';
import { ProductsCategoriesComponent } from './products-categories/products-categories.component';
import {CardModule} from 'primeng/card';
import { ProgressSpinnerModule } from 'primeng/progressspinner';
import { ProgressBarModule } from 'primeng/progressbar';
import {ButtonModule} from 'primeng/button';
@NgModule({
  declarations: [
    ProductsListComponent,
    ProductsDetailComponent,
    ProductsCategoriesComponent
  ],
  imports: [
    CommonModule,
    ProductsRoutingModule,

    ProgressSpinnerModule,
    ProgressBarModule,
    CardModule,
    ButtonModule

  ]
})
export class ProductsModule { }
