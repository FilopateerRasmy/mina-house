import { Component, OnInit } from '@angular/core';
import { CartService } from 'src/app/services/cart.service';
import { ProductsService } from 'src/app/services/products.service';
import { IProduct } from 'src/app/shared/products';

@Component({
  selector: 'app-products-list',
  templateUrl: './products-list.component.html',
  styleUrls: ['./products-list.component.scss']
})
export class ProductsListComponent implements OnInit {
// products!: IProduct[]
// isLoading = true
  constructor(private productService:ProductsService, private cartService:CartService) { }
  products!: IProduct[];
  afterFilter:IProduct[] = []
ngOnInit(): void {
    this.productService.getAllProducts().subscribe(
      {
        next: (result) => {
          // this.isLoading = false
          console.log(result.products)

          this.products = result.products;
          this.afterFilter = [...this.products]
        }
      }
    )
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
        this.products = filteredProducts.length ? filteredProducts : this.afterFilter
        }else{
          this.products = this.afterFilter
        }
    }
}


