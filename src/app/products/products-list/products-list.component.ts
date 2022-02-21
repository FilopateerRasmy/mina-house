import { Component, OnInit } from '@angular/core';
import { ProductsService } from 'src/app/services/products.service';
import { IProduct } from 'src/app/shared/products';

@Component({
  selector: 'app-products-list',
  templateUrl: './products-list.component.html',
  styleUrls: ['./products-list.component.scss']
})
export class ProductsListComponent implements OnInit {
productsArr!: IProduct[]
isLoading = true
  constructor(private productService:ProductsService) { }

  ngOnInit(): void {
    this.productService.getAllProducts().subscribe(
      {
        next: (result) => {
          this.isLoading = false
          this.productsArr = result.products
        }
      }
    )
  }

}
