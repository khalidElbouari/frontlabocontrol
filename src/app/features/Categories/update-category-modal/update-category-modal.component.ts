import {Component, EventEmitter, Input, Output} from '@angular/core';
import {Category} from "../../../entities/Category";
import {FormBuilder, FormGroup, ReactiveFormsModule, Validators} from "@angular/forms";
import {CategoryService} from "../../../services/Product/category.service";
import {NgbActiveModal} from "@ng-bootstrap/ng-bootstrap";
import {ProductService} from "../../../services/Product/product.service";
import {Product} from "../../../entities/Product";

@Component({
  selector: 'app-update-category-modal',
  standalone: true,
  imports: [
    ReactiveFormsModule
  ],
  templateUrl: './update-category-modal.component.html',
  styleUrl: './update-category-modal.component.css'
})
export class UpdateCategoryModalComponent {
  @Input() category!: Category;
  @Output() categoryUpdated = new EventEmitter<Category>();
  categoryForm!: FormGroup;

  constructor(
    private fb: FormBuilder,
    private categoryService: CategoryService,
    public activeModal: NgbActiveModal,
    protected productService: ProductService,

  ) { }

  ngOnInit(): void {
    this.createForm();
  }

  createForm(): void {
    this.categoryForm = this.fb.group({
      name: [this.category.name, Validators.required],
      description: [this.category.description]
    });
  }

  closeModal(): void {
    this.activeModal.dismiss();
  }

  submitForm(): void {
    if (this.categoryForm.valid) {
      const categoryData = {
        name: this.categoryForm.value.name,
        description: this.categoryForm.value.description
      };

      this.categoryService.updateCategory(this.category.id, categoryData).subscribe(
        (updatedCategory: Category) => {
         this.categoryUpdated.emit(updatedCategory);
         this.productService.getAllProducts();
         this.closeModal();
        },
        (error) => {
          console.error('Error updating category:', error);
        }
      );
    } else {
      console.error('Form validation failed.');
    }
  }

}
