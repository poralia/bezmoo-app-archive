import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../services/auth/auth.service';

export const AuthenticatedGuard: CanActivateFn = (route, state) => {
  const router = inject(Router);
  const authService = inject(AuthService);
  const credentials = authService.getCredentials();

  if (!credentials) {
    router.navigate(['/auth']);
    return false;
  }

  return true;
};
