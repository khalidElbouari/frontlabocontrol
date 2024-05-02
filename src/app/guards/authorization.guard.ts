import {CanActivateFn, Router} from '@angular/router';
import {AuthService} from "../services/security/auth.service";
import {inject} from "@angular/core";

export const authorizationGuard: CanActivateFn = (route, state) => {

  const auth = inject(AuthService);
  const router = inject(Router);

  if (auth.roles.includes("ADMIN")) {
    return true;
  }

  router.navigateByUrl("/not-authorized");
  return false;
};
