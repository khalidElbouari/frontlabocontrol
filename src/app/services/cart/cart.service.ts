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


  addToCart(userId: number, product: Product): Observable<Cart> {
    const url = `${this.baseUrl}/add?userId=${userId}`;
    return this.http.post<Cart>(url, product).pipe(
      catchError((error) => {
        // Handle error
        console.error('Error adding product to cart:', error,product,userId);
        throw error; // Rethrow the error to be caught by the caller
      })

    );
  }

  // Define the getCartItems method
  getCartItems(userId: number): Observable<CartItem[]> {
    const url = `${this.baseUrl}/items?userId=${userId}`; // Adjust the URL as per your backend API
    return this.http.get<CartItem[]>(url);
  }


}
