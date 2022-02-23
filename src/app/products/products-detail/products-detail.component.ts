import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap} from '@angular/router';
import { CartService } from 'src/app/services/cart.service';
import { ProductsService } from 'src/app/services/products.service';
import { IProduct } from 'src/app/shared/products';

@Component({
  selector: 'app-products-detail',
  templateUrl: './products-detail.component.html',
  styleUrls: ['./products-detail.component.scss']
})
export class ProductsDetailComponent implements OnInit {
  product!:IProduct;
  image!:string;
  message!:boolean
  constructor(private route:ActivatedRoute, private productService:ProductsService, private cartService: CartService) { }

  ngOnInit(): void {
    this.route.paramMap.subscribe((params:ParamMap) =>{
        const id = params.get('id');
        if(id){
          this.productService.getSingleProduct(id).subscribe({
            next: (result)=> {this.product = result.product
            }  
          })
        }
        
    })
  }
  cart(product:IProduct){
    console.log(product)
    this.cartService.addToCart(product)
  }

}
