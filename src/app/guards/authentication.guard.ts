import {CanActivateFn, Router} from '@angular/router';
import {AuthService} from "../services/security/auth.service";
import {inject} from "@angular/core";

export const authenticationGuard: CanActivateFn = (route, state) => {
  const auth = inject(AuthService);
  const router = inject(Router);

  // Define the routes that are allowed without authentication
  const allowedRoutesWithoutAuthentication = ['/login', '/signup', '/home', '/labostore'];

  // Check if the requested route is allowed without authentication
  if (allowedRoutesWithoutAuthentication.includes(state.url)) {
    return true; // Allow access to the route
  }

  // Check if the user is authenticated
  if (!auth.isAuthenticated) {
    // User is not authenticated, redirect to the login page
    router.navigateByUrl('/login');
    return false;
  }

  return true; // Allow access to the route
};
