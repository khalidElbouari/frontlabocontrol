import { Component, OnInit } from '@angular/core';
import { ProductService } from '../../services/product.service';
import { Product } from '../entities/Product';
import {CommonModule, NgForOf} from "@angular/common";

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
  products: Product[] = [];
  selectedProduct: Product | null = null;

  constructor(private productService: ProductService) {
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
}
