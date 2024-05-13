import { Injectable } from '@angular/core';
import {catchError, Observable} from "rxjs";
import {HttpClient} from "@angular/common/http";
import {Cart} from "../../entities/Cart";
import {CartItem} from "../../entities/CartItem";
import {Product} from "../../entities/Product";

@Injectable({
  providedIn: 'root'
})
export class CartService {
  private baseUrl = 'http://localhost:8055/api/carts';

  constructor(private http: HttpClient) { }

  getCart(): Observable<Cart> {
    return this.http.get<Cart>(`${this.baseUrl}/user`).pipe(
      catchError(error => {
        console.error('Error fetching user\'s cart:', error);
        throw error;
      })
    );
  }

  addToCart(cartItem: CartItem): Observable<any> {
    return this.http.post<any>(`${this.baseUrl}/add`, cartItem).pipe(
      catchError(error => {
        console.error('Error adding product to cart:', error);
        throw error;
      })
    );
  }


}
