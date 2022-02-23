import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http:HttpClient) { }
  URL:string = 'http://localhost:3000/api/v1/auth/'

  register (registerInfo:any){
    return this.http.post(this.URL + 'register',registerInfo);
  }

  login(userData:any){
    return this.http.post(this.URL + 'login', userData);
  }
}
