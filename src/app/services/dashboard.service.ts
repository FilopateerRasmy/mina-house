import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {user} from '../shared/dashboard-userInterface'

@Injectable({
  providedIn: 'root'
})
export class DashboardService {

  constructor(private http:HttpClient) { }
  URL:string = 'http://localhost:3000/api/v1/users/'

  getUser(userID:string){
    // return this.http.get<user>(this.URL + '6223ba154f4180f4cf889cbc')
    return this.http.get<user>(this.URL + userID)
  }
}
