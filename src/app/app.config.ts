import { ApplicationConfig } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { provideHttpClient, withInterceptors} from "@angular/common/http";
import {appHttpInterceptor} from "./interceptors/app-http.interceptor";
import {NgbActiveModal} from "@ng-bootstrap/ng-bootstrap";

export const appConfig: ApplicationConfig = {
  providers: [provideRouter(routes),provideHttpClient(withInterceptors([appHttpInterceptor])),
   NgbActiveModal
   ]
};
