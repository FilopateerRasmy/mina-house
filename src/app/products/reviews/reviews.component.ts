import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { ProductsService } from 'src/app/services/products.service';
import { ReviewsService } from 'src/app/services/reviews.service';
import { IProduct } from 'src/app/shared/products';
import { Ireview } from 'src/app/shared/reviews';

@Component({
  selector: 'app-reviews',
  templateUrl: './reviews.component.html',
  styleUrls: ['./reviews.component.scss']
})
export class ReviewsComponent implements OnInit {

  product!:IProduct;

  reviewForm = this.fb.group({
    comment:['',[Validators.required,Validators.maxLength(100)]],
    rating:['',[Validators.required,Validators.min(1),Validators.max(5)]],
    product:['',[Validators.required]]
  })
 
  msg: any;
  
  constructor(private fb:FormBuilder,private route:ActivatedRoute, private reviewService : ReviewsService , private productService: ProductsService) { }
  ProductId :any;
  ngOnInit(): void {

    this.route.paramMap.subscribe((params:ParamMap) =>{
      this.ProductId = params.get('id');
      console.log(this.ProductId);
      
      if(this.ProductId){
        this.productService.getSingleProduct(this.ProductId).subscribe({
          next: (result)=> {
            this.product = result.product
          },
          error: err => this.msg = err.error.msg  
        })
      }
      
  })
    
  }

  send(){
   
    
    this.reviewService.createReview(this.reviewForm.value).subscribe({
      next: (res)=>{ console.log(res)},
      error:(err)=>{console.log(err);
      }

    })
  }


}
