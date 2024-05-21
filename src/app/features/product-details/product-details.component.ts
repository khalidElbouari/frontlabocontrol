import {Component, OnInit} from '@angular/core';
import {CategoryComponent} from "../category/category.component";
import {Product} from "../../entities/Product";
import {ActivatedRoute} from "@angular/router";
import {ProductService} from "../../services/Product/product.service";
import {NavComponent} from "../shared/nav/nav.component";
import {Cart} from "../../entities/Cart";
import {CartItem} from "../../entities/CartItem";
import {CartService} from "../../services/cart/cart.service";
import {AuthService} from "../../services/security/auth.service";
import {ReactiveFormsModule} from "@angular/forms";
import {NgIf} from "@angular/common";

@Component({
  selector: 'app-product-details',
  standalone: true,
  imports: [
    NavComponent,
    CategoryComponent,
    NavComponent,
    ReactiveFormsModule,
    NgIf
  ],
  templateUrl: './product-details.component.html',
  styleUrl: './product-details.component.css'
})
export class ProductDetailsComponent implements OnInit{
  product!: Product;
  cartItemCount: number=0;

  constructor(private route: ActivatedRoute,
              protected productService: ProductService,
              private cartService: CartService,
              protected authService: AuthService,
              ) { }

  ngOnInit(): void {
    this.product = history.state.product;
    this.updateCartItemCount();
  }

  addToCart(product: Product): void {
    if (this.authService.isAuthenticated) {
      const userId = this.authService.userId;
      // Call the addToCart method with the user ID
      this.cartService.addToCart(userId, product).subscribe(
        (cart: Cart) => {
          this.updateCartItemCount();
        },
        error => {
          console.error('Error adding product to cart:', error);
        }
      );
    }  else {
      // If user is not logged in, add product to local storage
      let cartItems: CartItem[] = JSON.parse(localStorage.getItem('cartItems') ?? '[]');
      // Check if the product is already in the cart
      const existingItemIndex = cartItems.findIndex(item => item.product.id === product.id);
      if (existingItemIndex !== -1) {
        // If the product is already in the cart, increase its quantity
        cartItems[existingItemIndex].quantity++;
      } else {
        // If the product is not in the cart, add it as a new item
        cartItems.push({cart: undefined, id: undefined, product: product, quantity: 1 });
      }
      // Store the updated cart items back into local storage
      localStorage.setItem('cartItems', JSON.stringify(cartItems));
      this.updateCartItemCount();
    }
  }

  decrementQuantity(item: any) {
  }
  incrementQuantity(item: any) {
  }
  updateCartItemCount(): void {
    if (this.authService.isAuthenticated) {
      this.cartService.getCartItemsForUser(this.authService.userId)
        .subscribe((cartItems: CartItem[]) => {
          this.cartItemCount = cartItems.length;
        });
    } else {
      const cartItems = this.cartService.getCartItemsFromLocalStorage();
      this.cartItemCount = cartItems.length;
    }
  }

}
