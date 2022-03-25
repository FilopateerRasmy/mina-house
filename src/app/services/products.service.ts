import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IProduct } from '../shared/products';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {

  constructor(private http:HttpClient) { }

  
getProductsWithCategories(id:string):Observable<{products:IProduct[]; numOfPages:number}>{
  return this.http.get<{products:IProduct[]; numOfPages:number}>(`http://localhost:3000/api/v1/products?category=${id}`)
}

getAllProducts():Observable<{products:IProduct[]; numOfPages:number}>{
  return this.http.get<{products:IProduct[]; numOfPages:number}>(`http://localhost:3000/api/v1/products`)
}
getAllProductsWithSearch(name:string):Observable<{products:IProduct[]; numOfPages:number}>{
  return this.http.get<{products:IProduct[]; numOfPages:number}>(`http://localhost:3000/api/v1/products?name=${name}`)
}

getSingleProduct(id:string){
  return this.http.get<{product:IProduct}>(`http://localhost:3000/api/v1/products/${id}`)
}

}
