import {Component, Input} from '@angular/core';
import {NgForOf, NgIf} from "@angular/common";
import {AddCategoryModalComponent} from "../add-category-modal/add-category-modal.component";
import {Category} from "../../entities/Category";
import {CategoryService} from "../../services/Product/category.service";
import {AuthService} from "../../services/security/auth.service";

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

  constructor(private categoryService: CategoryService,protected authService: AuthService) {

  }

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
    const confirmDelete = window.confirm('Are you sure you want to delete this category?');
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

  onUpdateCategory(category: Category) {

  }

  onCategoryClicked(category: Category) {}




}
