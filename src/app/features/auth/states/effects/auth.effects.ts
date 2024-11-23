import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, map, mergeMap, of } from 'rxjs';
import { AuthActions } from '../actions/auth.actions';
import { AuthService } from '../../services/auth/auth.service';
import { ICredentials, ILogin, IRegister } from '../../interfaces';
import { Store } from '@ngrx/store';
import { AuthState } from '../reducers/auth.reducer';
import { Router } from '@angular/router';



@Injectable()
export class AuthEffects {

  constructor(
    private actions$: Actions,
    private authService: AuthService,
    private store: Store<AuthState>,
    private router: Router,
  ) {}

  // ...
  // Login
  // ...
  login$ = createEffect(() => this.actions$.pipe(
    ofType(AuthActions.login),
    mergeMap(({ data }) => this.authService.login(data).pipe(
      map((response) => AuthActions.loginSuccess({
        data: response,
      })),
      catchError((error) => of(AuthActions.loginFailure({
        error,
      }))),
    )),
  ));

  // ...
  // Login Success
  // ...
  loginSuccess$ = createEffect(() => this.actions$.pipe(
    ofType(AuthActions.loginSuccess),
    map(( response: any ) => {
      // Do something
      console.log(response);

      // Set user
      this.authService.setUser(response.data);

      // Set credentials
      const cred: ICredentials = {
        api_key: response.data.api_key,
        api_secret: response.data.api_secret,
      }

      this.authService.setCredentials(cred);

      // Redirect to home
      const roles = response.data.roles;

      if (roles.includes('Customer')) {
        // Redirect to customer home
        this.router.navigate(['/sales/customer'], { replaceUrl: true });
      } else {
        // Redirect to cashier home
      }
    }),
  ), { dispatch: false });

  // ...
  // Login failure
  // ...
  loginFailure$ = createEffect(() => this.actions$.pipe(
    ofType(AuthActions.loginFailure),
    map(( error ) => {
      // Do something
      console.log(error);
    }),
  ), { dispatch: false });


  // ...
  // Register
  // ...
  register$ = createEffect(() => this.actions$.pipe(
    ofType(AuthActions.register),
    mergeMap((payload: { data: IRegister }) => this.authService.register(payload.data).pipe(
      map((response) => AuthActions.registerSuccess({
        data: response,
        login: {
          usr: payload.data.email,
          pwd: payload.data.pwd,
        },
      })),
      catchError((error) => of(AuthActions.registerFailure({
        error,
      }))),
    )),
  ));

  // ...
  // Register Success
  // ...
  registerSuccess$ = createEffect(() => this.actions$.pipe(
    ofType(AuthActions.registerSuccess),
    map(( response ) => {
      // Do something
      console.log(response);

      // force to login
      this.store.dispatch(AuthActions.login({ data: response.login as ILogin }));
    }),
  ), { dispatch: false });

  // ...
  // Register failure
  // ...
  registerFailure$ = createEffect(() => this.actions$.pipe(
    ofType(AuthActions.registerFailure),
    map(( error ) => {
      // Do something
      console.log(error);
    }),
  ), { dispatch: false });


  // ...
  // Get current user
  // ...
  getCurrentUser$ = createEffect(() => this.actions$.pipe(
    ofType(AuthActions.getCurrentUser),
    mergeMap(() => this.authService.getCurrentUser().pipe(
      map((response) => AuthActions.getCurrentUserSuccess({
        data: response,
      })),
      catchError((error) => of(AuthActions.getCurrentUserFailure({
        error,
      }))),
    )),
  ));

  // ...
  // Get current user Success
  // ...
  getCurrentUserSuccess$ = createEffect(() => this.actions$.pipe(
    ofType(AuthActions.getCurrentUserSuccess),
    map(( response ) => {
      // Do something
      console.log(response);

      // Set user
      this.authService.setUser(response.data);
    }),
  ), { dispatch: false });

  // ...
  // Get current user failure
  // ...
  getCurrentUserFailure$ = createEffect(() => this.actions$.pipe(
    ofType(AuthActions.getCurrentUserFailure),
    map(( error ) => {
      // Do something
      console.log(error);
    }),
  ), { dispatch: false });


  // ...
  // Logout
  // ...
  logout$ = createEffect(() => this.actions$.pipe(
    ofType(AuthActions.logout),
    map(() => {
      return AuthActions.logoutSuccess();
    }),
  ));

  // ...
  // Logout success
  // ...
  logoutSuccess$ = createEffect(() => this.actions$.pipe(
    ofType(AuthActions.logoutSuccess),
    map(() => {
      // Do something
      this.router.navigate(['/auth'], { replaceUrl: true });
      // clear all data
      localStorage.clear();
    }),
  ), { dispatch: false });

}
