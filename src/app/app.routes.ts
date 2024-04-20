import { Routes } from '@angular/router';
import {ProductComponent} from "./Admin/product/product.component";
import {CategoryComponent} from "./Admin/category/category.component";
import {MenuComponent} from "./Admin/menu/menu.component";
import {LoginComponent} from "./login/login.component";
import {HomeComponent} from "./shared/home/home.component";

export const routes: Routes = [
  { path: 'home', component: HomeComponent },
  { path: 'login', component: LoginComponent, pathMatch: 'full' },
  { path: 'products', component: ProductComponent },
  { path: 'category', component: CategoryComponent },
  { path: 'menu', component: MenuComponent }// Add a wildcard route or default route to handle undefined routes
];
