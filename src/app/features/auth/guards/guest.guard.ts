import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../services/auth/auth.service';

export const GuestGuard: CanActivateFn = (route, state) => {
  const router = inject(Router);
  const authService = inject(AuthService);
  const credentials = authService.getCredentials();

  if (credentials) {
    router.navigate(['/sales/customer']);
    return false;
  }
  
  return true;
};
