import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap} from '@angular/router';
import { CartService } from 'src/app/services/cart.service';
import { ProductsService } from 'src/app/services/products.service';
import { IProduct } from 'src/app/shared/products';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-products-detail',
  templateUrl: './products-detail.component.html',
  styleUrls: ['./products-detail.component.scss'],
  providers:[MessageService]
})
export class ProductsDetailComponent implements OnInit {
  product!:IProduct;
  image!:string;
  message!:boolean
  msg = ''
  constructor(private route:ActivatedRoute, private productService:ProductsService, private messageService:MessageService,private cartService: CartService) { }

  ngOnInit(): void {
    this.route.paramMap.subscribe((params:ParamMap) =>{
        const id = params.get('id');
        if(id){
          this.productService.getSingleProduct(id).subscribe({
            next: (result)=> {
              this.product = result.product
            },
            error: err => this.msg = err.error.msg  
          })
        }
        
    })
  }
  cart(product:IProduct){
    console.log(product)
    this.cartService.addToCart(product)
    this.messageService.add({severity:'success', summary: 'Added to cart', detail: product.name});
  }

}
