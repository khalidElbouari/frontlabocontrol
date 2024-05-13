import {Component, OnInit} from '@angular/core';
import {NavComponent} from "../shared/nav/nav.component";
import {CartService} from "../../services/cart/cart.service";
import {AuthService} from "../../services/security/auth.service";
import {CartItem} from "../../entities/CartItem";
import {NgForOf} from "@angular/common";
import {FormsModule} from "@angular/forms";
import {ProductService} from "../../services/Product/product.service";

@Component({
  selector: 'app-cart',
  standalone: true,
  imports: [
    NavComponent,
    NgForOf,
    FormsModule
  ],
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.css'
})
export class CartComponent implements OnInit{
  cartItems: CartItem[] = [];

  constructor(private cartService: CartService,
              private authService: AuthService,
              protected productService: ProductService) { }

  ngOnInit(): void {
    // Check if user is authenticated
    if (this.authService.isAuthenticated) {
      // User is logged in, fetch cart items from backend
      this.fetchCartItemsFromBackend();
    } else {
      // User is not logged in, fetch cart items from local storage
      this.fetchCartItemsFromLocalStorage();
    }
  }

  fetchCartItemsFromBackend(): void {
    //  hna ghatjib lcart li mazal matvalidat
    /*this.cartService.getCartItems().subscribe(cartItems => {
      this.cartItems = cartItems;
    });*/
  }

  fetchCartItemsFromLocalStorage(): void {
    const cartItemsString = localStorage.getItem('cartItems');
    if (cartItemsString) {
      this.cartItems = JSON.parse(cartItemsString);
    }
    console.log("cartItemsString",this.cartItems)
  }

  getTotalPrice(): number {
    // Calculate total price of cart items
    return this.cartItems.reduce((total, item) => total + (item.product.price * item.quantity), 0);
  }

  decrementQuantity(item: CartItem): void {
    if (item.quantity > 1) {
      item.quantity--;
    }
  }

  incrementQuantity(item: CartItem): void {
    item.quantity++;
  }

  removeItem(item: CartItem): void {
    // Remove item from cart
    const index = this.cartItems.indexOf(item);
    if (index !== -1) {
      this.cartItems.splice(index, 1);
    }
    // Update local storage if user is not logged in
    if (!this.authService.isAuthenticated) {
      localStorage.setItem('cartItems', JSON.stringify(this.cartItems));
    }
  }

  proceedToCheckout(): void {
  }
}
