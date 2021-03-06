import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

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
reviews:Ireview[]= []
 getDecodedAccessToken(token: string): any {
  try {
    return jwt_decode(token);
  } catch(Error) {
    return null;
  }
}
getToken(){
  const user:any  = localStorage.getItem('user')
  this.userToken = JSON.parse(user)?.token
}
getInfo(){
  this.getToken()
  //console.log(this.userToken)
  const  tokenInfo = this.getDecodedAccessToken(  this.userToken ); // decode token
  if(this.userToken){
    this.userID = tokenInfo.userId
    this.userName = tokenInfo.name
  }
 
  // console.log(this.userID)
  // return this.userID
}

 createReview(reviewData: Ireview){
   return this.http.post<{review:Ireview}>(`https://mina-house-api.herokuapp.com/api/v1/reviews`,reviewData)
 }
 getProductReviews(id:string){
   return this.http.get<{reviews:Ireview[]}>(`https://mina-house-api.herokuapp.com/api/v1/reviews/${id}`)
 }


 deleteReview(id:string){
  return this.http.delete(`https://mina-house-api.herokuapp.com/api/v1/reviews/${id}`)
 }

 updateReview(id:string,reviewData: Ireview){
  return this.http.patch(`https://mina-house-api.herokuapp.com/api/v1/reviews/${id}`,reviewData)
 }
 


 
}
