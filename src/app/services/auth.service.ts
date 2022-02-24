import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';
import { User } from '../shared/user';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private  userData = {
    token:'',
    name:'',
    isLogin:false
  }
  


  isAuthanticated = new BehaviorSubject(this.userData);
  isAuthanticatedListener = this.isAuthanticated.asObservable();
  constructor(private http:HttpClient, private router:Router) { }
  URL:string = 'http://localhost:3000/api/v1/auth/'

  register (registerInfo:any){
    return this.http.post<User>(this.URL + 'register',registerInfo);
  }

  login(userData:any){
    return this.http.post<User>(this.URL + 'login', userData);
  }


  saveUser(token:string, name:string){
    this.userData.isLogin = true;
    this.userData.token = token;
    this.userData.name = name
    console.log(this.userData.name)
    this.isAuthanticated.next(this.userData)
    localStorage.setItem('user', JSON.stringify({name,token}))
  }
    checkUser(){
     const storage = localStorage.getItem('user')
      if(storage){
        const storageData = JSON.parse(storage)
        this.userData.token = storageData.token;
        this.userData.name = storageData.name;
        this.userData.isLogin = true
        this.isAuthanticated.next(this.userData);
      }
    }


    logout(){
      localStorage.removeItem('user');
      this.userData.isLogin = false;
      this.isAuthanticated.next(this.userData)
    }
}
