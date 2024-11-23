import { HttpErrorResponse, HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { ToastController } from '@ionic/angular';
import { catchError } from 'rxjs';

export const httpErrorInterceptor: HttpInterceptorFn = (req, next) => {
  const toastController: ToastController = inject(ToastController);

  return next(req).pipe(
    catchError(async (error: HttpErrorResponse) => {
      const toast = await toastController.create({
        message: error.error.message,
        duration: 2000,
        color: 'danger',
      });

      toast.present();

      throw error;
    }),
  );
};
