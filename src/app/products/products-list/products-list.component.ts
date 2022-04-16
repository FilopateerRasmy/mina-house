import {  ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { catchError, EMPTY, Observable, tap } from 'rxjs';
import { ProductsService } from 'src/app/services/products.service';
import { IProduct } from 'src/app/shared/products';

@Component({
  selector: 'app-products-list',
  templateUrl: './products-list.component.html',
  styleUrls: ['./products-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
 
})
export class ProductsListComponent implements OnInit {
  listOfProducts:Observable<IProduct[]> | undefined;
  isLoading = true;
  msg='';
  noData = false;
  constructor(private productService:ProductsService, private route: ActivatedRoute) { }

ngOnInit(): void {

  this.route.paramMap.subscribe( (params:ParamMap) => {
    const id = params.get('id');
    if(id){
   this.listOfProducts =  this.productService.getProductsWithCategories(id).pipe(
     tap((products)=>{
       this.isLoading = false;
       this.noData = products.length ? false : true;
     }),
     catchError((err)=>{
       this.isLoading = false;
       this.msg = err.error.msg;
       return EMPTY;
     })
   )
    }else{
    this.listOfProducts =  this.productService.productsWithCategory$.pipe(
      tap((products)=>{
        this.isLoading = false;
        this.noData = products.length ? false : true;
      }),
      catchError((err)=>{
        this.isLoading = false;
        this.msg = err.error.msg;
        return EMPTY;
      })
    )
    }
  })
  }



}


