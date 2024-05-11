import {Component, OnInit, signal} from '@angular/core';
import {Product} from "../../entities/Product";
import {ProductService} from "../../services/security/Product/product.service";
import {ProductComponent} from "../product/product.component";
import {NgIf} from "@angular/common";
import {NavComponent} from "../nav/nav.component";
import {AuthService} from "../../services/security/auth.service";
import {NgbModal} from "@ng-bootstrap/ng-bootstrap";
import {AddProductModalComponent} from "../add-product-modal/add-product-modal.component";
import {CategoryComponent} from "../category/category.component";
import {AddCategoryModalComponent} from "../add-category-modal/add-category-modal.component";
import {CategoryService} from "../../services/security/Product/category.service";
import {Category} from "../../entities/Category";

@Component({
  selector: 'app-labostore',
  standalone: true,
  imports: [
    ProductComponent,
    NgIf,
    NavComponent,
    CategoryComponent,
    AddCategoryModalComponent,
    AddProductModalComponent,
  ],
  templateUrl: './labostore.component.html',
  styleUrl: './labostore.component.css'
})
export class LabostoreComponent implements OnInit{
  products: Product[] | undefined;
  categories: Category[] | undefined;
  showAddCategoryModal: boolean = false;
  showAddProductModal: boolean = false;


  constructor(private productService: ProductService,
              protected authService: AuthService,
              private modalService: NgbModal,
              private categoryService: CategoryService,
             ) { }

  ngOnInit(): void {
    this.getProducts();
  }

  getProducts(): void {
    this.productService.getAllProducts()
      .subscribe(products => this.products = products);
  }
  openAddProductModal(): void {
    const modalRef = this.modalService.open(AddProductModalComponent, { size: 'lg' });
    modalRef.componentInstance.productAdded.subscribe(() => {
      this.getProducts(); // Reload products upon addition
    });
  }
  openAddCategoryModal() {
    const modalRef = this.modalService.open(AddCategoryModalComponent, { size: 'lg' });
    modalRef.componentInstance.categoryAdded.subscribe(() => {
      this.loadCategories(); // Reload categories upon addition
    });
  }

  loadCategories(): void {
    this.categoryService.getAllCategories().subscribe(categories => {
      this.categories = categories;
    });
  }
  onCategoryAdded(): void {
    this.loadCategories(); // Reload categories upon addition
  }
  onProductAdded(): void {
    this.getProducts(); // Reload products upon addition
  }
}
