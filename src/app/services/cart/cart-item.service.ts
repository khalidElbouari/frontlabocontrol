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


}
