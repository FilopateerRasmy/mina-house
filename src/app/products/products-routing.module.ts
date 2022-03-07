import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { ProductsDetailComponent } from './products-detail/products-detail.component';
import { ProductsListComponent } from './products-list/products-list.component';
import {  ReviewsComponent } from './reviews/reviews.component';
import { RatingModule } from "primeng/rating";
const routes: Routes = [
  {path:'', component:ProductsListComponent},
  {path:':id', component:ProductsDetailComponent},
   {path:'categories/:id', component:ProductsListComponent},
   {path:'reviews', component: ReviewsComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes),
    RatingModule
    
   
  
  ],
  
  exports: [RouterModule]
})
export class ProductsRoutingModule { }
