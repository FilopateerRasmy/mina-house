import { CartService } from 'src/app/services/cart.service';
import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { ProductsService } from 'src/app/services/products.service';
import { IProduct } from 'src/app/shared/products';

@Component({
  selector: 'app-display-products',
  templateUrl: './display-products.component.html',
  styleUrls: ['./display-products.component.scss']
})
export class DisplayProductsComponent implements OnInit {

  isLoading = true  
  constructor(private productService:ProductsService, private cartService:CartService, private route:ActivatedRoute) { }
 @Input() products: IProduct[] = [];
  beforeFilter:IProduct[] = []
  ngOnInit(): void {
  
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
