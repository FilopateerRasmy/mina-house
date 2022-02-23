import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavbarComponent } from './navbar/navbar.component';


import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { HomeComponent } from './home/home.component';
import { CartModule } from './cart/cart.module';
import { HttpClientModule } from '@angular/common/http'
import { PrimengModule } from './primeng/primeng.module';
@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    HomeComponent,

  ],
  imports: [
    BrowserModule,
    AppRoutingModule,

    BrowserAnimationsModule,

    CartModule,
    HttpClientModule,
    PrimengModule

  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
