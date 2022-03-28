import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AccountDetailsComponent } from './components/account-details/account-details.component';
import { AccountOverviewComponent } from './components/account-overview/account-overview.component';
import { ChangePasswordComponent } from './components/change-password/change-password.component';
import { LayoutComponent } from './components/layout/layout.component';
import { OrdersComponent } from './components/orders/orders.component';


const routes: Routes = [
  {path:'customer',component:LayoutComponent, children:[

    {path:'account/overview',component:AccountOverviewComponent},
    {path:'account/edit',component:AccountDetailsComponent},

    {path:'new-password',component:ChangePasswordComponent},
    //we might not need the order component
    {path:'orders',component:OrdersComponent},
  ]},
];
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DashboardRoutingModule { }
