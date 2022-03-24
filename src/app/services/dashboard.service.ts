import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import {user} from '../shared/dashboard-userInterface'
import jwt_decode from 'jwt-decode';
import { AuthService } from './auth.service';
import { registerData } from '../shared/registerInterface';
import { Password } from '../shared/passwordFormInterface';

@Injectable({
  providedIn: 'root'
})
export class DashboardService {

  constructor(private http:HttpClient) { }
  URL:string = 'http://localhost:3000/api/v1/users/'
  userToken:string='';
  userID:string='';

  getUser(userID:string){
    var header = {
      headers: new HttpHeaders()
        .set('Authorization',  `Bearer ${this.userToken}`)}

    return this.http.get<user>(this.URL + userID , header)
  }

  updateUser( user:registerData  ){
    var header = {
      headers: new HttpHeaders()
        .set('Authorization',  `Bearer ${this.userToken}`)}
    return this.http.patch<registerData>(this.URL + "updateUser" , user, header)
  }
  
  changeUserPass(password:Password){
    var header = {
      headers: new HttpHeaders()
        .set('Authorization',  `Bearer ${this.userToken}`)}

    return this.http.patch<Password>(this.URL + "updateUserPassword" , password, header)
  }
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
  getUserID(){
    this.getToken()
    const  tokenInfo = this.getDecodedAccessToken(  this.userToken ); // decode token
    this.userID = tokenInfo.userId
  }
}
