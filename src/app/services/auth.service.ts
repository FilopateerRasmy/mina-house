import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor() { }
  URL:string = 'http://localhost:3000/api/v1/auth/register'

  register (registerInfo:RegisterUserForm){
    return this.http.post(this.URL,registerInfo)
  }
}
