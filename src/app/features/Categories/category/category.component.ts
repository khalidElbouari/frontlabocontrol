import {Component, Input} from '@angular/core';
import {NgForOf, NgIf} from "@angular/common";
import {AddCategoryModalComponent} from "../add-category-modal/add-category-modal.component";
import {Category} from "../../../entities/Category";
import {CategoryService} from "../../../services/Product/category.service";
import {AuthService} from "../../../services/security/auth.service";
import {UpdateCategoryModalComponent} from "../update-category-modal/update-category-modal.component";
import {NgbModal} from "@ng-bootstrap/ng-bootstrap";

@Component({
  selector: 'app-category',
  standalone: true,
  imports: [
    NgForOf,
    NgIf],
  templateUrl: './category.component.html',
  styleUrl: './category.component.css'
})
export class CategoryComponent {
  @Input() categories!: Category[] | undefined;

  constructor(private categoryService: CategoryService,
              protected authService: AuthService,
              private modalService: NgbModal) {}

  ngOnInit(): void {
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

  onDeleteCategory(categoryId: number): void {
    const confirmDelete = window.confirm('Êtes-vous sûr de vouloir supprimer cette catégorie ?');
    if (confirmDelete) {
      this.categoryService.deleteCategory(categoryId).subscribe({
        next: () => {
          console.log('Category deleted successfully.');
          this.loadCategories(); // Reload categories after deletion
        },
        error: (error) => {
          console.error('Error deleting category:', error);
        }
      });
    }
  }

  openUpdateModal(category: Category): void {
    const modalRef = this.modalService.open(UpdateCategoryModalComponent);
    modalRef.componentInstance.category = category;
    modalRef.componentInstance.categoryUpdated.subscribe(() => {
      this.loadCategories(); // Reload categories after update
    });
  }
}
