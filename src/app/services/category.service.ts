import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { shareReplay } from 'rxjs';

import { ICategory } from '../shared/category';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  constructor(private http:HttpClient) { }



  
   categories$ = this.http.get<ICategory[]>('https://mina-house-api.herokuapp.com/api/v1/categories').pipe(shareReplay(1))
  
}
