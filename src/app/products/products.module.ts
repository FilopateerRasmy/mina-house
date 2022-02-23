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
import {PaginatorModule} from 'primeng/paginator';
import { FormsModule } from '@angular/forms';
import {DataViewModule} from 'primeng/dataview';
import {PanelModule} from 'primeng/panel';
import {DropdownModule} from 'primeng/dropdown';
import {DialogModule} from 'primeng/dialog';
import {InputTextModule} from 'primeng/inputtext';
import {RatingModule} from 'primeng/rating';
import {RippleModule} from 'primeng/ripple';
import {GalleriaModule} from 'primeng/galleria';
import {MessagesModule} from 'primeng/messages';
import {MessageModule} from 'primeng/message';


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
    ButtonModule,
    FormsModule,
    PaginatorModule,
    DataViewModule,
    RatingModule,
    InputTextModule,
    DialogModule,
    DropdownModule,
    PanelModule,
    RippleModule,
    GalleriaModule,
    MessagesModule,
    MessageModule
  ]
})
export class ProductsModule { }
