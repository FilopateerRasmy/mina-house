import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap} from '@angular/router';
import { ProductsService } from 'src/app/services/products.service';
import { IProduct } from 'src/app/shared/products';

@Component({
  selector: 'app-products-detail',
  templateUrl: './products-detail.component.html',
  styleUrls: ['./products-detail.component.scss']
})
export class ProductsDetailComponent implements OnInit {
  product!:IProduct;
  constructor(private route:ActivatedRoute, private productService:ProductsService) { }

  ngOnInit(): void {
    this.route.paramMap.subscribe((params:ParamMap) =>{
        const id = params.get('id');
        if(id){
          this.productService.getSingleProduct(id).subscribe({
            next: (result)=> this.product = result.product
          })
        }
    })
  }

}
