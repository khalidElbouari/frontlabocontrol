import {Component, Input, OnInit} from '@angular/core';
import { ProductService } from '../../services/Product/product.service';
import { Product } from '../../entities/Product';
import {CommonModule} from "@angular/common";
import {AuthService} from "../../services/security/auth.service";
import {Router} from "@angular/router";
import {CartService} from "../../services/cart/cart.service";
import {CartItem} from "../../entities/CartItem";
import {Cart} from "../../entities/Cart";

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  standalone: true,
  imports: [
    CommonModule
  ],
  styleUrls: ['./product.component.css']
})
export class ProductComponent implements OnInit {
  @Input() products: Product[] = [];
  selectedProduct: Product | null = null;



  constructor(protected authService:AuthService,
              protected productService: ProductService,
              private router: Router,
              protected cartService:CartService) {
  }

  ngOnInit(): void {
    this.loadProducts();
  }

  loadProducts(): void {
    this.productService.getAllProducts().subscribe(
      data => {
        this.products = data;
      },
      error => {
        console.error("Error loading products:", error);
      }
    );
  }

  deleteProduct(product: Product): void {
    if (confirm('Are you sure you want to delete this product?')) {
      this.productService.deleteProduct(product.id).subscribe(
        () => {
          console.log('Product deleted successfully');
          this.loadProducts(); // Reload the products list
        },
        error => {
          console.error('Error deleting product:', error);
        }
      );
    }
  }

  updateProduct(product: Product): void {
    this.selectedProduct = product; // Set the selected product
  }

  saveUpdate(): void {
    if (this.selectedProduct) {
      this.productService.updateProduct(this.selectedProduct.id, this.selectedProduct).subscribe(
        updatedProduct => {
          console.log('Product updated successfully:', updatedProduct);
          this.selectedProduct = null; // Clear the selected product
          this.loadProducts(); // Reload the products list
        },
        error => {
          console.error('Error updating product:', error);
        }
      );
    }
  }
  // Subscribe to the productAdded event emitted by AddProductComponent


  navigateToProductDetail(product: Product): void {
    this.router.navigate(['/productdetails', product.id], { state: { product: product } });
  }

  addToCart(product: Product): void {
    if (this.authService.isAuthenticated) {
      // If user is logged in, fetch user's cart from backend
      this.cartService.getCart().subscribe(
        (cart: Cart) => {
          // Create a new cart item with the selected product
          const cartItem: CartItem = {
            id: undefined, // Assuming the backend generates the ID
            cart: cart,    // Associate the cart with the cart item
            product: product,
            quantity: 1     // Set initial quantity to 1
          };
          // Add the cart item to the user's cart
          this.cartService.addToCart(cartItem).subscribe(
            () => {
              // Successfully added product to cart on backend
              // You can optionally update the UI or show a success message
            },
            error => {
              console.error('Error adding product to cart:', error);
              // Handle error, e.g., show error message to user
            }
          );
        },
        error => {
          console.error('Error fetching user\'s cart:', error);
          // Handle error, e.g., show error message to user
        }
      );
    } else {
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
    }
  }

}
