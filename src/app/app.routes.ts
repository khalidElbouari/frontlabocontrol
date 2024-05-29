import { Routes } from '@angular/router';
import {ProductComponent} from "./features/Produits/product/product.component";

import {HomeComponent} from "./features/shared/home/home.component";
import {PageNoteFoundComponent} from "./features/shared/page-note-found/page-note-found.component";
import {SignUpComponent} from "./authentication/sign-up/sign-up.component";
import {LoginComponent} from "./authentication/login/login.component";
import {authenticationGuard} from "./guards/authentication.guard";
import {CategoryComponent} from "./features/Categories/category/category.component";
import {authorizationGuard} from "./guards/authorization.guard";
import {NotAuthorizedComponent} from "./authentication/not-authorized/not-authorized.component";
import {LabostoreComponent} from "./features/labostore/labostore.component";
import {CartComponent} from "./features/Produits/cart/cart.component";
import {ProductDetailsComponent} from "./features/Produits/product-details/product-details.component";

export const routes: Routes = [
  { path: 'login', component: LoginComponent, pathMatch: 'full' },
  { path: 'signup', component: SignUpComponent, pathMatch: 'full' },
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: 'home', component: HomeComponent },


  { path: 'labostore', component: LabostoreComponent/*, canActivate: [authenticationGuard]*/, // Utilisation du guard
    children:[
      { path: 'products', component: ProductComponent/*, canActivate: [authorizationGuard], data: { role: "ADMIN" }*/ },
      { path: 'category', component: CategoryComponent },
    ]
  },
  { path: 'cart', component: CartComponent },
  { path: 'productdetails/:id', component: ProductDetailsComponent },
  { path: 'not-authorized', component: NotAuthorizedComponent },
  { path: '**', component: PageNoteFoundComponent },
];
