import {CanActivateFn, Router} from '@angular/router';
import {AuthService} from "../services/security/auth.service";
import {inject} from "@angular/core";

export const authenticationGuard: CanActivateFn = (route, state) => {
  const auth = inject(AuthService);
  const router = inject(Router);

  if(auth.isAuthenticated==false) {
    router.navigateByUrl('/login')
    return false
  }
  return true
};
