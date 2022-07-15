import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UsersRoutingModule } from './users-routing.module';
import { PrimengModule } from '../primeng/primeng.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { ForgotPasswordComponent } from './forgot - reset password/forgot-password/forgot-password.component';
import { LayoutComponent } from './forgot - reset password/layout/layout.component';
import { MessagePageComponent } from './forgot - reset password/message-page/message-page.component';
import { ResetPasswordComponent } from './forgot - reset password/reset-password/reset-password.component';
@NgModule({
  declarations: [
    LoginComponent,
    RegisterComponent,
    LayoutComponent,
    ForgotPasswordComponent,
    MessagePageComponent,
    ResetPasswordComponent
  ],
  imports: [
    CommonModule,
    PrimengModule,
    UsersRoutingModule,
    ReactiveFormsModule,
    FormsModule
  ]
})
export class UsersModule { }
