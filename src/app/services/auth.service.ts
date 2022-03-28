import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';
import { IresetPassword } from '../shared/IresetPassword';
import { User } from '../shared/user';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
    userData = {
    token:'',
    name:'',
    isLogin:false
  }
  


  isAuthanticated = new BehaviorSubject(this.userData);
  isAuthanticatedListener = this.isAuthanticated.asObservable();



  constructor(private http:HttpClient, private router:Router) { }
  URL:string = 'https://mina-house-api.herokuapp.com/api/v1/auth/'

  register (registerInfo:any){
    return this.http.post<User>(this.URL + 'register',registerInfo);
  }

  login(userData:any){
    return this.http.post<User>(this.URL + 'login', userData);
  }

  forgotPassword(email:any){
    return this.http.post<any>(this.URL + 'forgot-password', email)
  }

  resetPassword(resetPassword:IresetPassword){
    return this.http.post<any>(this.URL + 'reset-password', resetPassword);
  }

  

  saveUser(token:string, name:string){
    this.userData.isLogin = true;
    this.userData.token = token;
    this.userData.name = name;
    this.isAuthanticated.next(this.userData);
    localStorage.setItem('user', JSON.stringify({name,token}));
  }

    checkUser(){
     const storage = localStorage.getItem('user');
      if(storage){
        const storageData = JSON.parse(storage);
        this.userData.token = storageData.token;
        this.userData.name = storageData.name;
        this.userData.isLogin = true
        this.isAuthanticated.next(this.userData);
      }
    }


    logout(){
      localStorage.removeItem('user');
      this.userData.isLogin = false;
      this.userData.name = '';
      this.userData.token = '';
      this.isAuthanticated.next(this.userData)
    }

    
}
