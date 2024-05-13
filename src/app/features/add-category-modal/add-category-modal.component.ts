import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators} from "@angular/forms";
import {NgbActiveModal, NgbModule} from "@ng-bootstrap/ng-bootstrap";
import {CategoryService} from "../../services/Product/category.service";
import {Category} from "../../entities/Category";

@Component({
  selector: 'app-add-category-modal',
  standalone: true,
  imports: [
    FormsModule,
    ReactiveFormsModule,
    NgbModule
  ],
  templateUrl: './add-category-modal.component.html',
  styleUrl: './add-category-modal.component.css'
})
export class AddCategoryModalComponent implements  OnInit{

  categoryForm!: FormGroup;
  @Output() categoryAdded: EventEmitter<Category> = new EventEmitter<Category>();


  constructor(
    private formBuilder: FormBuilder,
    public activeModal: NgbActiveModal,
    private categoryService: CategoryService
  ) { }

  ngOnInit(): void {
    this.initCategoryForm();
  }

  initCategoryForm(): void {
    this.categoryForm = this.formBuilder.group({
      name: ['', Validators.required],
      description: ['']
    });
  }

  closeModal(): void {
    this.activeModal.dismiss(); // Dismiss the modal
  }

  submitForm(): void {
    if (this.categoryForm.valid) {
      const categoryData: Category = this.categoryForm.value;
      this.categoryService.createCategory(categoryData).subscribe({
        next: (createdCategory) => {
          console.log('Category created successfully:', createdCategory);
          this.activeModal.close();
          this.categoryAdded.emit(createdCategory); // Emit the created category

        },
        error: (error) => {
          console.error('Error creating category:', error);
        }
      });
    } else {
      this.categoryForm.markAllAsTouched();
    }
  }


}
