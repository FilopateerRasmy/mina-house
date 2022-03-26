import { Component, Input, OnChanges, OnInit, SimpleChanges} from '@angular/core';
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
export class ReviewsComponent implements OnInit  {

  product!:IProduct;

  reviewForm = this.fb.group({
    comment:['',[Validators.required,Validators.maxLength(100)]],
    rating:['',[Validators.required,Validators.min(1),Validators.max(5)]],
    product:['',[Validators.required]],
    user:['',[Validators.required]],
    username:['',Validators.required]
  })
 
  msg: any;
  
 
  

  constructor(private fb:FormBuilder,private route:ActivatedRoute,private auth:AuthService, private reviewService : ReviewsService , private productService: ProductsService) { 
  
  }
  ProductId :any;
 reviews:any;
  userId:any
  uName:any
  reviewId: any;
  reviewIndex: any;
  review:any
 

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
     
      
      
      
    
      ////////////////////////////////////////////
      
      if(this.ProductId){
      this.reviewService.getProductReviews(this.ProductId).subscribe({
        next:(res)=>{
          this.userId = res.reviews.user
          this.reviews  = res.reviews
          
          //this.reviewsLength= this.reviews.length
          //console.log(this.reviewsLength);
          
  
          ///console.log(this.reviewService.userID); //usertoken
        
        },
        error:(err)=>{console.log(err);}
        
      })
    }

      
  })
    
  }

 
  send(){
   
    this.reviewService.createReview(this.reviewForm.value).subscribe({
      next: (res)=>{ 
        
        this.reviewId = res.review._id

        this.reviews.push(res.review)
        this.reviewForm.get('comment')?.reset()
        this.reviewForm.get('rating')?.reset()
      },
      error:(err)=>{console.log(err)}

    })


  }

  delete(id:string){
  

      this.reviewService.deleteReview(this.reviewId).subscribe({
        next:(res)=>{console.log(res);
          this.reviews.splice(this.reviewIndex,1)
          //this.delete(id)
        },
        error:(err)=>{console.log(err);}
        
      })
   
  }

   update(id:string){

    for(var review of this.reviews){
      if(review._id === this.reviewId )
      {
        const oldComment =review.comment;
       const oldRating = review.rating
       this.reviewForm.get('comment')?.patchValue(oldComment)
       this.reviewForm.get('rating')?.patchValue(oldRating)
      }
    }
   if( review._id === id){
    this.reviewService.updateReview(review._id,this.reviewForm.value).subscribe({
      next:(res)=>{console.log(res);
        //console.log(this.reviews.indexOf(review));
        
        //this.reviews.splice(this.reviews.indexOf(review),1)
        console.log(review._id);
        
        this.delete(review._id)
      },
      
      error:(err)=>{console.log(err);}
      
    })
  }
  
  }

}
