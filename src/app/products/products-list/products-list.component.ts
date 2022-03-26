import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { ProductsService } from 'src/app/services/products.service';
import { IProduct } from 'src/app/shared/products';

@Component({
  selector: 'app-products-list',
  templateUrl: './products-list.component.html',
  styleUrls: ['./products-list.component.scss']
})
export class ProductsListComponent implements OnInit {
  listOfProducts:IProduct[] = []
  isLoading = true;
  msg='';
  noData = false;
  constructor(private productService:ProductsService, private route: ActivatedRoute) { }

ngOnInit(): void {

  this.route.paramMap.subscribe( (params:ParamMap) => {
    const id = params.get('id');
    if(id){
      this.productService.getProductsWithCategories(id).subscribe({
        next: (result)=>{
          this.isLoading = false;
          this.noData = result.products.length ? false : true
          this.listOfProducts = result.products;
        },
        error: error => {
          this.isLoading = false;
          this.msg = error.error.msg || error.message
        }
      })
    }else{
      this.productService.getAllProducts().subscribe({
        next: (result) =>{
          this.listOfProducts = result.products
        }
      })
    }
  })
  }



}


