import {Component, OnInit, signal} from '@angular/core';
import {Product} from "../../entities/Product";
import {ProductService} from "../../services/security/Product/product.service";
import {ProductComponent} from "../product/product.component";
import {NgIf} from "@angular/common";
import {NavComponent} from "../nav/nav.component";
import {AuthService} from "../../services/security/auth.service";
import {NgbModal} from "@ng-bootstrap/ng-bootstrap";
import {AddProductModalComponent} from "../add-product-modal/add-product-modal.component";

@Component({
  selector: 'app-labostore',
  standalone: true,
  imports: [
    ProductComponent,
    NgIf,
    NavComponent
  ],
  templateUrl: './labostore.component.html',
  styleUrl: './labostore.component.css'
})
export class LabostoreComponent implements OnInit{
  products: Product[] | undefined;

  constructor(private productService: ProductService,
              protected authService: AuthService,
              private modalService: NgbModal) { }

  ngOnInit(): void {
    this.getProducts();
  }

  getProducts(): void {
    this.productService.getAllProducts()
      .subscribe(products => this.products = products);
  }
  openAddProductModal() {
    // Call your modal opening logic here
    // For example, using NgbModal
    this.modalService.open(AddProductModalComponent, { size: 'lg' });
  }
}
