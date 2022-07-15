import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { forkJoin, map, Observable, pluck, shareReplay } from 'rxjs';
import { IProduct } from '../shared/products';
import { CategoryService } from './category.service';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {

  constructor(private http: HttpClient, private categoryService: CategoryService) { }


  getProductsWithCategories(id: string): Observable<IProduct[]> {
    return this.http.get<{ products: IProduct[]; numOfPages: number }>(`https://mina-house-api.herokuapp.com/api/v1/products?category=${id}`).pipe(pluck("products"),
      shareReplay()
    )
  }


  products$ = this.http.get<{ products: IProduct[], numOfPages: number }>(`https://mina-house-api.herokuapp.com/api/v1/products`).pipe(
    pluck("products"),
    shareReplay()
  )

  productsWithCategory$ = forkJoin([this.products$, this.categoryService.categories$]).pipe(
    map(([products, categories]) => products.map(product => ({
      ...product,
      categoryName: categories.find(cat => product.category === cat._id)?.name
    } as IProduct))),
    shareReplay()

  )

  getSingleProduct(id: string) {
    return this.http.get<{ product: IProduct }>(`https://mina-house-api.herokuapp.com/api/v1/products/${id}`)
  }

}
