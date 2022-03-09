import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';

const routes: Routes = [
  {path:'', component:HomeComponent},
  {path:'users', loadChildren:()=> import('./users/users.module').then(m => m.UsersModule)},
  {path:'products', loadChildren:()=> import('./products/products.module').then(m => m.ProductsModule)},
  {path:'customer', loadChildren:()=> import('./dashboard/dashboard.module').then(m => m.DashboardModule)},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
