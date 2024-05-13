import {Component, OnInit} from '@angular/core';
import {CategoryComponent} from "../category/category.component";
import {Product} from "../../entities/Product";
import {ActivatedRoute} from "@angular/router";
import {ProductService} from "../../services/Product/product.service";
import {NavComponent} from "../shared/nav/nav.component";

@Component({
  selector: 'app-product-details',
  standalone: true,
  imports: [
    NavComponent,
    CategoryComponent,
    NavComponent
  ],
  templateUrl: './product-details.component.html',
  styleUrl: './product-details.component.css'
})
export class ProductDetailsComponent implements OnInit{
  product!: Product;

  constructor(private route: ActivatedRoute,
              protected productService: ProductService,) { }

  ngOnInit(): void {
    // Retrieve product data from router state
    this.product = history.state.product;
  }
}
