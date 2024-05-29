import {Component, OnInit, signal} from '@angular/core';
import {Product} from "../../entities/Product";
import {ProductService} from "../../services/Product/product.service";
import {ProductComponent} from "../Produits/product/product.component";
import {NgIf} from "@angular/common";
import {NavComponent} from "../shared/nav/nav.component";
import {AuthService} from "../../services/security/auth.service";
import {NgbModal} from "@ng-bootstrap/ng-bootstrap";
import {AddProductModalComponent} from "../Produits/add-product-modal/add-product-modal.component";
import {CategoryComponent} from "../Categories/category/category.component";
import {AddCategoryModalComponent} from "../Categories/add-category-modal/add-category-modal.component";
import {CategoryService} from "../../services/Product/category.service";
import {Category} from "../../entities/Category";
import {CartItem} from "../../entities/CartItem";
import {CartService} from "../../services/cart/cart.service";

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
  cartItemCount: number=0;


  constructor(private productService: ProductService,
              protected authService: AuthService,
              private modalService: NgbModal,
              private categoryService: CategoryService,
              private cartService: CartService,
             ) { }

  ngOnInit(): void {
    this.getProducts();
    this.updateCartItemCount();
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
  onProductAddedToCart(): void {
    this.updateCartItemCount(); // Update cart count when a product is added
  }
  updateCartItemCount(): void {
    if (this.authService.isAuthenticated) {
      this.cartService.getCartItemsForUser(this.authService.userId)
        .subscribe((cartItems: CartItem[]) => {
          this.cartItemCount = cartItems.length;
        });
    } else {
      const cartItemsString = localStorage.getItem('cartItems');
      if (cartItemsString) {
        const cartItems: CartItem[] = JSON.parse(cartItemsString);
        this.cartItemCount = cartItems.length;
      } else {
        // If there are no cart items in local storage, set cartItemCount to 0
        this.cartItemCount = 0;
      }
    }
  }
}
