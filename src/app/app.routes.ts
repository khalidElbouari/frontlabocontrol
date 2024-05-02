import { Routes } from '@angular/router';
import {ProductComponent} from "./features/product/product.component";

import {HomeComponent} from "./features/shared/home/home.component";
import {AdminTemplateComponent} from "./features/admin-template/admin-template.component";
import {PageNoteFoundComponent} from "./features/shared/page-note-found/page-note-found.component";
import {SignUpComponent} from "./authentication/sign-up/sign-up.component";
import {LoginComponent} from "./authentication/login/login.component";
import {authenticationGuard} from "./guards/authentication.guard";
import {CategoryComponent} from "./features/category/category.component";
import {authorizationGuard} from "./guards/authorization.guard";
import {NotAuthorizedComponent} from "./authentication/not-authorized/not-authorized.component";

export const routes: Routes = [
  { path: 'home', component: HomeComponent },
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: 'login', component: LoginComponent, pathMatch: 'full' },
  { path: 'signup', component: SignUpComponent, pathMatch: 'full' },

  { path: 'admin', component: AdminTemplateComponent, canActivate: [authenticationGuard], // Utilisation du guard
    children:[
      { path: 'products', component: ProductComponent ,canActivate:[authorizationGuard], data :{role : "ADMIN"} },
      { path: 'category', component: CategoryComponent}
    ] },
  {path:'not-authorized',component:NotAuthorizedComponent},
  {path:'**',component:PageNoteFoundComponent},
];
