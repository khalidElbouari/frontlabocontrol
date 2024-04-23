import { HttpInterceptorFn } from '@angular/common/http';
import {AuthService} from "../services/security/auth.service";
import {inject} from "@angular/core";

export const appHttpInterceptor: HttpInterceptorFn = (req, next) => {
  const authService: AuthService = inject(AuthService); // Inject AuthService within the interceptor function
  const authToken:string = authService.accessToken;
  if(!req.url.includes("/auth/login")){
    // Clone the request and add the authorization header
    const authReq = req.clone({
      headers: req.headers.set('Authorization','Bearer '+authToken)
    });
    return next(authReq);
  }else{
    return next(req);

  }

};
