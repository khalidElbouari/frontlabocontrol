import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import { ProductService } from '../../../services/Product/product.service';
import { Product } from '../../../entities/Product';
import {CommonModule} from "@angular/common";
import {AuthService} from "../../../services/security/auth.service";
import {Router} from "@angular/router";
import {CartService} from "../../../services/cart/cart.service";
import {CartItem} from "../../../entities/CartItem";
import {Cart} from "../../../entities/Cart";
import {NgbModal} from "@ng-bootstrap/ng-bootstrap";
import {UpdateProductModalComponent} from "../update-product-modal/update-product-modal.component";
import {Category} from "../../../entities/Category";
import {CartItemService} from "../../../services/cart/cart-item.service";

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
  @Output() productAddedToCart: EventEmitter<void> = new EventEmitter<void>();




  constructor(protected authService:AuthService,
              protected productService: ProductService,
              private router: Router,
              protected cartService:CartService,private modalService: NgbModal,
              private cartItemService: CartItemService) {
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
          if (error.status === 400) {
            alert('Product is in carts and cannot be deleted');
          } else {
            console.error('Error deleting product:', error);
          }
        }
      );
    }
  }



  navigateToProductDetail(product: Product): void {
    this.router.navigate(['/productdetails', product.id], { state: { product: product } });
  }

  addToCart(product: Product): void {
    if (this.authService.isAuthenticated) {
      // If user is logged in, fetch user ID
      const userId = this.authService.userId;
      // Call the addToCart method with the user ID
      this.cartService.addToCart(userId, product).subscribe(
        (cart: Cart) => {
          // Successfully added product to cart on backend
          this.productAddedToCart.emit();
        },
        error => {
          console.error('Error adding product to cart:', error);
        }
      );
    }else {
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
      this.productAddedToCart.emit(); // Emit event

    }
  }

  openUpdateModal(product: any) {
    const modalRef = this.modalService.open(UpdateProductModalComponent, { centered: true });
    modalRef.componentInstance.product = product;
    modalRef.componentInstance.productUpdated.subscribe((updatedProduct: any) => { // Explicitly specify the type
      // Product updated, reload the products list
      this.loadProducts();
    });
  }

}
