import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ForgotPasswordComponent } from './forgot - reset password/forgot-password/forgot-password.component';
import { LayoutComponent } from './forgot - reset password/layout/layout.component';
import { MessagePageComponent } from './forgot - reset password/message-page/message-page.component';
import { ResetPasswordComponent } from './forgot - reset password/reset-password/reset-password.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';

const routes: Routes = [
  {path:'', component:LoginComponent},
  {path:'register', component:RegisterComponent},
  {path:'recover-password', component: LayoutComponent , children:[
    {path:'forgot-password', component:ForgotPasswordComponent},
    {path:'instructions', component:MessagePageComponent},
    {path:'reset-password', component:ResetPasswordComponent},
  ]}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UsersRoutingModule { }
