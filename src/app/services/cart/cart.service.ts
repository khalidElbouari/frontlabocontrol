import {EventEmitter, Injectable} from '@angular/core';
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
  productAddedToCart: EventEmitter<void> = new EventEmitter<void>();


  constructor(private http: HttpClient) { }
//hadi ghat7ayad
  getCartItemsForUser(userId: number): Observable<CartItem[]> {
    const url = `${this.baseUrl}/items?userId=${userId}`;
    return this.http.get<CartItem[]>(url);
  }
  // Fetch cart items for authenticated user
/*  getCartItemsForUser(userId: number): Observable<CartItem[]> {
    const url = `${this.baseUrl}/user/${userId}`;
    return this.http.get<CartItem[]>(url);
  }*/

  // Fetch cart items from local storage for unauthenticated user
  getCartItemsFromLocalStorage(): CartItem[] {
    const cartItemsString = localStorage.getItem('cartItems');
    return cartItemsString ? JSON.parse(cartItemsString) : [];
  }
  addToCart(userId: number, product: Product): Observable<Cart> {
    const url = `${this.baseUrl}/add?userId=${userId}`;
    return this.http.post<Cart>(url, product).pipe(
      catchError((error) => {
        console.error('Error adding product to cart:', error,product,userId);
        throw error; // Rethrow the error to be caught by the caller
      })
    );
  }
  processCartItems(userId: number, cartItems: CartItem[]): Observable<any> {
    const url = `${this.baseUrl}/process?userId=${userId}`;
    return this.http.post<any>(url, cartItems);
  }



}
