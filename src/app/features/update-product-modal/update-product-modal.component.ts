import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {NgForOf} from "@angular/common";
import {FormBuilder, FormGroup, ReactiveFormsModule} from "@angular/forms";
import {Category} from "../../entities/Category";
import {ProductService} from "../../services/Product/product.service";
import {NgbActiveModal} from "@ng-bootstrap/ng-bootstrap";
import {CategoryService} from "../../services/Product/category.service";

@Component({
  selector: 'app-update-product-modal',
  standalone: true,
  imports: [
    NgForOf,
    ReactiveFormsModule
  ],
  templateUrl: './update-product-modal.component.html',
  styleUrl: './update-product-modal.component.css'
})
export class UpdateProductModalComponent implements OnInit{
  @Input() product: any;
  @Output() productUpdated: EventEmitter<any> = new EventEmitter<any>();

  productForm!: FormGroup;
  categories: Category[] = [];

  constructor(
    private fb: FormBuilder,
    private productService: ProductService,
    public activeModal: NgbActiveModal,
    private categoryService: CategoryService
  ) {}

  ngOnInit(): void {
    this.productForm = this.fb.group({
      name: this.product.name,
      price: this.product.price,
      stockQuantity: this.product.stockQuantity,
      category: this.product.category,
      image: [''],
      description: this.product.description,
    });

    // Load categories if needed
    this.loadCategories();
  }

  loadCategories(): void {
    this.categoryService.getAllCategories().subscribe(
      (categories: Category[]) => {
        this.categories = categories;
      },
      (error: any) => {
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

      const fileControl = this.productForm.get('image');
      if (fileControl && fileControl.value) {
        const file = fileControl.value; // Get the file from the form

        // Call the updateProduct method from ProductService to update the product
        this.productService.updateProduct(this.product.id, productData, file).subscribe(
          (product) => {
            // Emit an event to notify the parent component that the product has been updated
            this.productUpdated.emit(product);
            // Close the modal
            this.closeModal();
          },
          (error) => {
            // Handle error if product update fails
            console.error('Error updating product:', error);
          }
        );
      } else {
        console.error('Image file not selected.');
      }
    } else {
      // Handle form validation errors
      console.error('Form validation failed.');
    }
  }

  onImageSelected(event: any) {
    const file: File = event.target.files[0];
    this.productForm.patchValue({
      image: file
    });
  }

}
