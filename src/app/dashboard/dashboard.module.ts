import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DashboardRoutingModule } from './dashboard-routing.module';
import { PrimengModule } from '../primeng/primeng.module';


@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    DashboardRoutingModule,
    PrimengModule
  ]
})
export class DashboardModule { }
