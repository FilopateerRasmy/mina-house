import { CartService } from 'src/app/services/cart.service';
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
  isLoading = true  
  constructor(private productService:ProductsService, private cartService:CartService, private route:ActivatedRoute) { }
  products!: IProduct[];
  beforeFilter:IProduct[] = []
  ngOnInit(): void {
    this.route.paramMap.subscribe((params:ParamMap)=>{
      const id = params.get('id');
      if(id){
        this.productService.getProductsWithCategories(id).subscribe({
          next: (result)=>{ 
            this.isLoading =false
            this.products = result.products;
            this.beforeFilter = [...this.products];
          }
        })

      }
    })
  }
  sortOptions =  [
    {label: 'Price High to Low', value: '!price'},
    {label: 'Price Low to High', value: 'price'}
];;

  sortOrder!: number;

  sortField!: string;

  // constructor(private productService: ProductService) { }

 
  onSortChange(event:any) {
      let value = event.value;

      if (value.indexOf('!') === 0) {
          this.sortOrder = -1;
          this.sortField = value.substring(1, value.length);
      }
      else {
          this.sortOrder = 1;
          this.sortField = value;
      }
  }

  

  cart(product:IProduct){
    console.log(product)
    this.cartService.addToCart(product)
  }
  onFilter($event:Event){

      const filter = ($event.target as HTMLInputElement).value;
      if(filter){
        const filteredProducts = this.products.map(product => ({...product, name:product.name.toLowerCase()})).filter(product => product.name.includes(filter.toLowerCase()) )
      this.products = filteredProducts.length ? filteredProducts : this.beforeFilter
      }else{
        this.products = this.beforeFilter
      }
  }

}
