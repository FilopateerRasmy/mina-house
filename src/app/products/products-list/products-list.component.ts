import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { CartService } from 'src/app/services/cart.service';
import { ProductsService } from 'src/app/services/products.service';
import { IProduct } from 'src/app/shared/products';

@Component({
  selector: 'app-products-list',
  templateUrl: './products-list.component.html',
  styleUrls: ['./products-list.component.scss']
})
export class ProductsListComponent implements OnInit {
  listOfProducts:IProduct[] = []
  isLoading = true  
  constructor(private productService:ProductsService, private route: ActivatedRoute) { }

ngOnInit(): void {

  this.route.paramMap.subscribe( (params:ParamMap) => {
    const id = params.get('id');
    if(id){
      this.productService.getProductsWithCategories(id).subscribe({
        next: (result)=>{
          this.listOfProducts = result.products
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


