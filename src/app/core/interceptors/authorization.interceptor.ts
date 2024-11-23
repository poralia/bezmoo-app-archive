import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { AuthService } from 'src/app/features/auth/services/auth/auth.service';

export const authorizationInterceptor: HttpInterceptorFn = (req, next) => {
  const authService = inject(AuthService);
  const credentials = authService.getCredentials();

  if (credentials) {
    const credCombine = `${credentials.api_key}:${credentials.api_secret}`;
    req = req.clone({
      setHeaders: {
        "Authorization": `Basic ${btoa(credCombine)}`,
      }
    })
  }

  return next(req);
};
