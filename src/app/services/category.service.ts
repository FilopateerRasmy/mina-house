import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ICategory } from '../shared/category';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  constructor(private http:HttpClient) { }



  getAllCategories():Observable<ICategory[]>{
    return this.http.get<ICategory[]>('https://mina-house-api.herokuapp.com/api/v1/categories')
  }
}
