import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';
import { Ireview } from '../shared/reviews';

@Injectable({
  providedIn: 'root'
})
export class ReviewsService {

 constructor(private http:HttpClient){}


 createReview(reviewData: Ireview){
   return this.http.post(`http://localhost:3000/api/v1/reviews`,reviewData)
 }
 getProductReviews(id:string){
   
 }
}
