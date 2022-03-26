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
  index: number = 0;

  openNext() {
      this.index = (this.index === 2) ? 0 : this.index + 1;
  }

  openPrev() {
      this.index = (this.index === 0) ? 2 : this.index - 1;
  }
  product!:IProduct;

  reviewForm = this.fb.group({
    comment:['',[Validators.required,Validators.maxLength(100)]],
    rating:['',[Validators.required,Validators.min(1),Validators.max(5)]],
    product:['',[Validators.required]],
    user:['',[Validators.required]],
    username:['',Validators.required]
  })
 
  msg: any;
  
 
  ProductId :any;
  reviews:Ireview[]=[];
  userId = '';
  uName:any;

  index: number = 0;

  openNext() {
      this.index = (this.index === 2) ? 0 : this.index + 1;
  }

  openPrev() {
    this.index = (this.index === 0) ? 2 : this.index - 1;
}
     


  constructor(private fb:FormBuilder,private route:ActivatedRoute,private auth:AuthService, private reviewService : ReviewsService , private productService: ProductsService) { 
    this.reviewService.getInfo()
    this.userId = this.reviewService.userID
  }

 

  ngOnInit(): void {
 
  
 
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
          this.reviews = res.reviews

        
        },
        error:(err)=>{console.log(err);}
        
      })
    }

      
  })
    
  }

 
  send(){
   
    this.reviewService.createReview(this.reviewForm.value).subscribe({
      next: (res)=>{ 
        this.reviews = [...this.reviews, res.review]
        this.reviewForm.get('comment')?.reset()
        this.reviewForm.get('rating')?.reset()

      },
      error:(err)=>{console.log(err)}

    })


  }

  delete(id:string){
  

      this.reviewService.deleteReview(id).subscribe({
        next:(res)=>{console.log(res);
          const index = this.reviews.findIndex((item:Ireview) => item._id === id);
          console.log(index)
          this.reviews.splice(index,1)
          this.reviews = [...this.reviews]
          //this.delete(id)
        },
        error:(err)=>{console.log(err);}
        
      })
   
  }

  //update(id:string,review:Ireview){

  // this.openNext();

  // this.reviewForm.patchValue({rating:review.rating,comment:review.comment})

  //   this.reviewService.updateReview(id,this.reviewForm.value).subscribe({
  //     next:(res)=>{
       
  //       console.log(res)
       
  //     },
      
  //     error:(err)=>{console.log(err);}
      
  //   })
  // }
  
  }


