import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {FormBuilder, FormGroup, FormsModule, ReactiveFormsModule} from "@angular/forms";
import {NgbActiveModal} from "@ng-bootstrap/ng-bootstrap";
import {ProductService} from "../../../services/Product/product.service";
import {CategoryService} from "../../../services/Product/category.service";
import {NgForOf} from "@angular/common";
import {Category} from "../../../entities/Category";
import {Product} from "../../../entities/Product";

@Component({
  selector: 'app-add-product-modal',
  standalone: true,
  imports: [
    FormsModule,
    NgForOf,
    ReactiveFormsModule
  ],
  templateUrl: './add-product-modal.component.html',
  styleUrl: './add-product-modal.component.css'
})
export class AddProductModalComponent implements OnInit {
  @Output() productAdded:EventEmitter<Product> = new EventEmitter<Product>();


  productForm!: FormGroup;
    categories: Category[] = [];

    constructor(
      private fb: FormBuilder,
      private productService: ProductService,
      private categoryService: CategoryService,
      public activeModal: NgbActiveModal
    ) {}

    ngOnInit() {
      this.productForm = this.fb.group({
        name: this.fb.control(""),
        price:this.fb.control(""),
        stockQuantity: this.fb.control(""),
        category: this.fb.control(""),
        image: [''],
        description: this.fb.control(""),

      });
      this.loadCategories();
    }

    loadCategories() {
      this.categoryService.getAllCategories().subscribe(
        (categories) => {
          this.categories = categories;
        },
        (error) => {
          console.error('Error loading categories:', error);
        }
      );
    }

    closeModal() {
      this.activeModal.close();
    }

  submitForm() {
    if (this.productForm.valid) {
      const productData = {
        name: this.productForm.value.name,
        description: this.productForm.value.description,
        price: this.productForm.value.price,
        category: this.productForm.value.category,
        stockQuantity: this.productForm.value.stockQuantity
      };

      const file = this.productForm.value.image;

      // Call the addProduct method from ProductService to add the product
      this.productService.addProduct(productData, file).subscribe(
        (products:Product) => {
          // Emit an event to notify the parent component that a new product has been added
          this.productAdded.emit(products);
          // Close the modal
          this.closeModal();
        },
        (error) => {
          // Handle error if product addition fails
          console.error('Error adding product:', error);
        }
      );
    } else {
      // Handle form validation errors or missing image
      console.error('Form validation failed or image not selected.');
    }
  }

  onImageSelected(event: any) {
      const file: File = event.target.files[0];
      this.productForm.patchValue({
        image: file
      });
    }

}
