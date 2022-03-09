import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
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
    product:['',[Validators.required]],
    user:['',[Validators.required]],
    username:['',Validators.required]
  })
 
  msg: any;
 
  
  constructor(private fb:FormBuilder,private route:ActivatedRoute,private auth:AuthService, private reviewService : ReviewsService , private productService: ProductsService) { }
  ProductId :any;
  reviews:any
  userId:any
  uName:any
  
    
    
 

  ngOnInit(): void {

    

    this.reviewService.getInfo()
    this.route.paramMap.subscribe((params:ParamMap) =>{
      this.ProductId = params.get('id');
      this.reviewForm.patchValue({
        product : this.ProductId
      })
      this.reviewForm.patchValue({
       user :this.reviewService.userID
      })
      this.reviewForm.patchValue({
        username : this.reviewService.userName
       })
     
      
      
      
      
      if(this.ProductId){
        this.productService.getSingleProduct(this.ProductId).subscribe({
          next: (result)=> {
            this.product = result.product
          },
          error: err => this.msg = err.error.msg  
        })
        
      }
      ////////////////////////////////////////////
      if(this.ProductId){
      this.reviewService.getProductReviews(this.ProductId).subscribe({
        next:(res)=>{
         const json = JSON.stringify(res)
         const data = JSON.parse(json)
         console.log(json);
         
          this.reviews = data.reviews;
         
         
  
        },
        error:(err)=>{console.log(err);}
        
      })
    }
      
  })
    
  }

  send(){
   
    console.log(this.reviewForm.value);
    
    
    this.reviewService.createReview(this.reviewForm.value).subscribe({
      next: (res)=>{ console.log(res)},
      error:(err)=>{console.log(err)}

    })
  }




}
