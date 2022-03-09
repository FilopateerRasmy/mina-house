import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { ProductsDetailComponent } from './products-detail/products-detail.component';
import { ProductsListComponent } from './products-list/products-list.component';

const routes: Routes = [
  {path:'', component:ProductsListComponent},
  {path:':id', component:ProductsDetailComponent},
   {path:'categories/:id', component:ProductsListComponent},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProductsRoutingModule { }
