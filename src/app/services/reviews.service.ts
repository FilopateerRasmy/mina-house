import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';
import { Ireview } from '../shared/reviews';
import jwt_decode from 'jwt-decode'

@Injectable({
  providedIn: 'root'
})
export class ReviewsService {
  userToken: any;
  userID: any;
  userName: any;

 constructor(private http:HttpClient){}

 getDecodedAccessToken(token: string): any {
  try {
    return jwt_decode(token);
  } catch(Error) {
    return null;
  }
}
getToken(){
  const user:any  = localStorage.getItem('user')
  this.userToken = JSON.parse(user).token
}
getInfo(){
  this.getToken()
  console.log(this.userToken)
  const  tokenInfo = this.getDecodedAccessToken(  this.userToken ); // decode token
  this.userID = tokenInfo.userId
  this.userName = tokenInfo.name
  // console.log(this.userID)
  // return this.userID
}

 createReview(reviewData: Ireview){
   return this.http.post(`http://localhost:3000/api/v1/reviews`,reviewData)
 }
 getProductReviews(id:string){
   return this.http.get(`http://localhost:3000/api/v1/reviews/${id}`)
 }
}
