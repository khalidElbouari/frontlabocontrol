import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {CartItem} from "../../entities/CartItem";

@Injectable({
  providedIn: 'root'
})
export class CartItemService {
  private baseUrl = 'http://localhost:8055/api/cart-items';
  constructor(private http: HttpClient) { }
  removeItem(item: CartItem): Observable<void> {
    const url = `${this.baseUrl}/${item.id}`;
    return this.http.delete<void>(url);
  }

  updateCartItemQuantity(itemId: number, newQuantity: number): Observable<CartItem> {
    const url = `${this.baseUrl}/${itemId}/quantity`;
    return this.http.put<CartItem>(url, null, { params: { quantity: newQuantity.toString() } });
  }


}
