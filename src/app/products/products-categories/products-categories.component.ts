import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { ProductsService } from 'src/app/services/products.service';
import { IProduct } from 'src/app/shared/products';

@Component({
  selector: 'app-products-categories',
  templateUrl: './products-categories.component.html',
  styleUrls: ['./products-categories.component.scss']
})
export class ProductsCategoriesComponent implements OnInit {
productsArr!:IProduct[];
isLoading= true;
  constructor(private route:ActivatedRoute, private productService:ProductsService) { }

  ngOnInit(): void {
    this.route.paramMap.subscribe((params:ParamMap)=>{
      const id = params.get('id');
      if(id){
        this.productService.getProductsWithCategories(id).subscribe({
          next: (result)=>{ 
            this.isLoading =false
            this.productsArr = result.products;


          }
        })

      }
    })
  }

}
