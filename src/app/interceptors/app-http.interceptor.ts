import { HttpInterceptorFn } from '@angular/common/http';
import {AuthService} from "../services/security/auth.service";
import {inject} from "@angular/core";

export const appHttpInterceptor: HttpInterceptorFn = (req, next) => {
  //ghadi nakhdo mn local storage 7ssan bach ila refrechit la page ghadi ykon dima kayan
  const authToken = localStorage.getItem('accessToken');

  if (!req.url.includes("/auth/login") && !req.url.includes("/auth/register") && !req.url.includes("/api/product/all")  && !req.url.includes("/api/category/all")) {
    // Clone the request and add the authorization header
    const authReq = req.clone({
      headers: req.headers.set('Authorization','Bearer '+authToken)
    });
    return next(authReq);
  }else{
    return next(req);
  }
};
