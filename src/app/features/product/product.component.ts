import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import { ProductService } from '../../services/security/Product/product.service';
import { Product } from '../../entities/Product';
import {CommonModule, NgForOf} from "@angular/common";
import {AddProductModalComponent} from "../add-product-modal/add-product-modal.component";
import {timestamp} from "rxjs";
import {DomSanitizer, SafeUrl} from "@angular/platform-browser";

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



  constructor(private productService: ProductService, private sanitizer: DomSanitizer) {
  }

  ngOnInit(): void {
    this.loadProducts();
  }

  loadProducts(): void {
    this.productService.getAllProducts().subscribe(
      data => {
        console.log(data);
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

  addToCart(product: Product) {
  }
  // New method to generate image URL
  getImageUrl(product: Product): SafeUrl {
    if (product.imagePath) {
      return this.sanitizer.bypassSecurityTrustUrl(`http://localhost:8055/${product.imagePath}`);
    } else {
      return 'assets/placeholder-image.jpg'; // Update with your placeholder image path
    }
  }


  getImageSrc(product: Product): string {
    if (product.imageData) {
      return `data:image/jpeg;base64,${product.imageData}`;
    } else {
      return 'assets/placeholder-image.jpg'; // Replace with your placeholder image path
    }
  }


}
