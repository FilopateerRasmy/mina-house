import { Order } from './../shared/order';
import { Observable } from 'rxjs/internal/Observable';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class OrderService {
  Url = 'https://mina-house-api.herokuapp.com/api/v1/orders';
  
  constructor(private http: HttpClient) {}
  storage = localStorage.getItem('user');
  getToken() {
    if (this.storage) {
      const token = JSON.parse(this.storage).token;
      console.log(token);

      return token;
    }
  }

  createOrder(order: Order): Observable<any> {
    const headers = new HttpHeaders().set(
      'Authorization',
      `Bearer ${this.getToken()}`
    );
    return this.http.post<{ order: Order }>(this.Url, order, {
      headers,
    });
  }

  getUserOrders(): Observable<any> {
    const headers = new HttpHeaders().set(
      'Authorization',
      `Bearer ${this.getToken()}`
    );
    return this.http.get(this.Url+"/history", {
      headers,
    });
  }
}
