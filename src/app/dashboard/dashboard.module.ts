import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DashboardRoutingModule } from './dashboard-routing.module';
import { PrimengModule } from '../primeng/primeng.module';
import { AccountDetailsComponent } from './components/account-details/account-details.component';
import { AccountOverviewComponent } from './components/account-overview/account-overview.component';
import { ChangePasswordComponent } from './components/change-password/change-password.component';
import { LayoutComponent } from './components/layout/layout.component';
import { OrdersComponent } from './components/orders/orders.component';

import { ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    AccountDetailsComponent,
    AccountOverviewComponent,
    ChangePasswordComponent,
    LayoutComponent,
    OrdersComponent,
 
  ],
  imports: [
    CommonModule,
    DashboardRoutingModule,
    PrimengModule,
    ReactiveFormsModule
  ]
})
export class DashboardModule { }
