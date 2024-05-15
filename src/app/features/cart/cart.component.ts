import {Component, OnInit} from '@angular/core';
import {NavComponent} from "../shared/nav/nav.component";
import {CartService} from "../../services/cart/cart.service";
import {AuthService} from "../../services/security/auth.service";
import {CartItem} from "../../entities/CartItem";
import {NgForOf} from "@angular/common";
import {FormsModule} from "@angular/forms";
import {ProductService} from "../../services/Product/product.service";
import {CartItemService} from "../../services/cart/cart-item.service";

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
  cartItemCount!: number;

  constructor(private cartService: CartService,
              private authService: AuthService,
              protected productService: ProductService,
              protected cartItemService: CartItemService,
  ) { }
  ngOnInit(): void {
    // Check if user is authenticated
    if (this.authService.isAuthenticated) {
      // User is logged in, fetch cart items from backend
      this.fetchCartItemsFromBackend();
    } else {
      // User is not logged in, fetch cart items from local storage
      this.fetchCartItemsFromLocalStorage();
    }
    this.updateCartItemCount();
  }

  fetchCartItemsFromBackend(): void {
    // Get the user ID from the authentication service
    const userId = this.authService.userId;
    // Call the service method to fetch cart items for the logged-in user
    this.cartService.getCartItems(userId).subscribe(
      cartItems => {
        this.cartItems = cartItems;
      },
      error => {
        console.error('Error fetching cart items:', error);
        // Handle error, e.g., show error message to user
      }
    );
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
      item.quantity--; // Update the quantity locally
      if (this.authService.isAuthenticated && item.id) {
        this.updateCartItemQuantity(item.id, item.quantity); // Send request to update quantity in backend if authenticated
      } else {
        localStorage.setItem('cartItems', JSON.stringify(this.cartItems)); // Update local storage
      }
    }
  }

  incrementQuantity(item: CartItem): void {
    item.quantity++; // Update the quantity locally
    if (this.authService.isAuthenticated && item.id) {
      this.updateCartItemQuantity(item.id, item.quantity); // Send request to update quantity in backend if authenticated
    } else {
      localStorage.setItem('cartItems', JSON.stringify(this.cartItems)); // Update local storage
    }
  }


  removeItem(item: CartItem): void {
    // Display a confirmation dialog before removing the item
    const isConfirmed = confirm('Are you sure you want to remove this item from your cart?');
    if (!isConfirmed) {
      return; // If user cancels, exit the function
    }

    // Remove item from cart
    const index = this.cartItems.indexOf(item);
    if (index !== -1) {
      this.cartItems.splice(index, 1);
    }
    // Update local storage if user is not logged in
    if (!this.authService.isAuthenticated) {
      localStorage.setItem('cartItems', JSON.stringify(this.cartItems));
      this.updateCartItemCount();
    } else {
      // If user is authenticated, call the backend API to remove the item
      this.cartItemService.removeItem(item).subscribe(
        () => {
          console.log('Item removed successfully');
          this.updateCartItemCount();
        },

        error => {
          console.error('Error removing item:', error);
          // Handle error, e.g., show error message to user
        }
      );
    }
  }

  updateCartItemQuantity(itemId: number, quantity: number): void {
    // Update cart item quantity in the backend if the user is authenticated
    if (this.authService.isAuthenticated) {
      this.cartItemService.updateCartItemQuantity(itemId, quantity).subscribe(
        updatedItem => {
          // Update the quantity in the local cartItems array
          const index = this.cartItems.findIndex(item => item.id === itemId);
          if (index !== -1) {
            this.cartItems[index].quantity = updatedItem.quantity;
          }
         // confirm('Item quantity updated successfully');
        },
        error => {
        //  confirm('Error updating item quantity:');
          // Handle error, e.g., show error message to user
        }
      );
    } else {
      // Update local storage if the user is not authenticated
      localStorage.setItem('cartItems', JSON.stringify(this.cartItems));
    }
  }

  updateCartItemCount(): void {
    if (this.authService.isAuthenticated) {
      this.cartService.getCartItems(this.authService.userId)
        .subscribe((cartItems: CartItem[]) => {
          this.cartItemCount = cartItems.length;
        });
    } else {
      const cartItemsString = localStorage.getItem('cartItems');
      if (cartItemsString) {
        const cartItems: CartItem[] = JSON.parse(cartItemsString);
        this.cartItemCount = cartItems.length;
      } else {
        // If there are no cart items in local storage, set cartItemCount to 0
        this.cartItemCount = 0;
      }
    }
  }

  proceedToCheckout(): void {
  }
}
