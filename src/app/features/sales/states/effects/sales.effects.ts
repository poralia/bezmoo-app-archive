import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { SalesActions } from '../actions/sales.actions';
import { catchError, map, mergeMap, of } from 'rxjs';
import { SalesOrderService } from '../../services/sales-order/sales-order.service';
import { POSService } from '../../services/pos/pos.service';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { AuthState } from 'src/app/features/auth/states/reducers/auth.reducer';
import { AuthActions } from 'src/app/features/auth/states/actions/auth.actions';
import { CompanyService } from '../../services/company/company.service';



@Injectable()
export class SalesEffects {

  constructor(
    private actions$: Actions,
    private salesOrderService: SalesOrderService,
    private POSService: POSService,
    private companyService: CompanyService,
    private router: Router,
    private store: Store<AuthState>,
  ) {}

  // ...
  // Get sales order
  // ...
  getSalesOrder$ = createEffect(() => 
    this.actions$.pipe(
      ofType(SalesActions.loadSalesOrder),
      mergeMap(({ filters }) => {
        return this.salesOrderService.getSalesOrder(filters).pipe(
          map((response) => SalesActions.loadSalesOrderSuccess({ data: response, filters: filters })),
          catchError((error) => of(SalesActions.loadSalesOrderFailure({ error, filters: filters })))
        );
      })
    )
  );

  getSalesOrderSuccess$ = createEffect(() => 
    this.actions$.pipe(
      ofType(SalesActions.loadSalesOrderSuccess),
      map((response: any) => {
        // Do something
        console.log(response);
      })
    ), { dispatch: false }
  );

  getSalesOrderFailure$ = createEffect(() => 
    this.actions$.pipe(
      ofType(SalesActions.loadSalesOrderFailure),
      map((response: any) => {
        // Do something
        console.log(response);
      })
    ), { dispatch: false }
  );

  // ...
  // Retrieve sales order
  // ...
  retrieveSalesOrder$ = createEffect(() => 
    this.actions$.pipe(
      ofType(SalesActions.retrieveSalesOrder),
      mergeMap(({ name }) => {
        return this.salesOrderService.retrieveSalesOrder(name).pipe(
          map((response) => SalesActions.retrieveSalesOrderSuccess({ data: response })),
          catchError((error) => of(SalesActions.retrieveSalesOrderFailure({ error })))
        );
      })
    )
  );

  retrieveSalesOrderSuccess$ = createEffect(() => 
    this.actions$.pipe(
      ofType(SalesActions.retrieveSalesOrderSuccess),
      map((response: any) => {
        // Do something
        console.log(response);
      })
    ), { dispatch: false }
  );

  retrieveSalesOrderFailure$ = createEffect(() => 
    this.actions$.pipe(
      ofType(SalesActions.retrieveSalesOrderFailure),
      map((response: any) => {
        // Do something
        console.log(response);
      })
    ), { dispatch: false }
  );

  // ...
  // Get POS Profile
  // ...
  getPOSProfile$ = createEffect(() => 
    this.actions$.pipe(
      ofType(SalesActions.loadPOSProfile),
      mergeMap(({ payload }) => {
        return this.POSService.getPOSProfile(payload).pipe(
          map((response) => SalesActions.loadPOSProfileSuccess({ data: response, filters: payload.filters })),
          catchError((error) => of(SalesActions.loadPOSProfileFailure({ error, filters: payload.filters })))
        );
      })
    )
  );

  getPOSProfileSuccess$ = createEffect(() => 
    this.actions$.pipe(
      ofType(SalesActions.loadPOSProfileSuccess),
      map((response: any) => {
        // Do something
        console.log(response);
      })
    ), { dispatch: false }
  );

  getPOSProfileFailure$ = createEffect(() => 
    this.actions$.pipe(
      ofType(SalesActions.loadPOSProfileFailure),
      map((response: any) => {
        // Do something
        console.log(response);
      })
    ), { dispatch: false }
  );


  // ...
  // Create Queue
  // ...
  createQueue$ = createEffect(() => 
    this.actions$.pipe(
      ofType(SalesActions.createQueue),
      mergeMap(({ payload }) => {
        return this.POSService.createQueue(payload.data).pipe(
          map((response) => SalesActions.createQueueSuccess({ data: response })),
          catchError((error) => of(SalesActions.createQueueFailure({ error })))
        );
      })
    )
  );

  createQueueSuccess$ = createEffect(() => 
    this.actions$.pipe(
      ofType(SalesActions.createQueueSuccess),
      map((response: any) => {
        // Do something
        console.log(response);
        this.router.navigate(['/sales/customer'], { replaceUrl: true });
        // refresh the user
        this.store.dispatch(AuthActions.getCurrentUser());

      })
    ), { dispatch: false }
  );

  createQueueFailure$ = createEffect(() => 
    this.actions$.pipe(
      ofType(SalesActions.createQueueFailure),
      map((response: any) => {
        // Do something
        console.log(response);
      })
    ), { dispatch: false }
  );


  // ...
  // Load Queue
  // ...
  loadQueue$ = createEffect(() => 
    this.actions$.pipe(
      ofType(SalesActions.loadQueue),
      mergeMap(({ payload }) => {
        return this.POSService.getQueue(payload).pipe(
          map((response) => SalesActions.loadQueueSuccess({ data: response, filters: payload.filters })),
          catchError((error) => of(SalesActions.loadQueueFailure({ error, filters: payload.filters })))
        );
      })
    )
  );

  loadQueueSuccess$ = createEffect(() => 
    this.actions$.pipe(
      ofType(SalesActions.loadQueueSuccess),
      map((response: any) => {
        // Do something
        console.log(response);
      })
    ), { dispatch: false }
  );

  loadQueueFailure$ = createEffect(() => 
    this.actions$.pipe(
      ofType(SalesActions.loadQueueFailure),
      map((response: any) => {
        // Do something
        console.log(response);
      })
    ), { dispatch: false }
  );


  // ...
  // Delete Queue
  // ...
  deleteQueue$ = createEffect(() => 
    this.actions$.pipe(
      ofType(SalesActions.deleteQueue),
      mergeMap(({ payload }) => {
        return this.POSService.deleteQueue(payload.name).pipe(
          map((response) => SalesActions.deleteQueueSuccess({ data: response })),
          catchError((error) => of(SalesActions.deleteQueueFailure({ error })))
        );
      })
    )
  );

  deleteQueueSuccess$ = createEffect(() => 
    this.actions$.pipe(
      ofType(SalesActions.deleteQueueSuccess),
      map((response: any) => {
        // Do something
        console.log(response);
      })
    ), { dispatch: false }
  );

  deleteQueueFailure$ = createEffect(() => 
    this.actions$.pipe(
      ofType(SalesActions.deleteQueueFailure),
      map((response: any) => {
        // Do something
        console.log(response);
      })
    ), { dispatch: false }
  );


   // ...
  // Load Company
  // ...
  loadCompany$ = createEffect(() => 
    this.actions$.pipe(
      ofType(SalesActions.loadCompany),
      mergeMap(({ payload }) => {
        return this.companyService.getCompany(payload).pipe(
          map((response) => SalesActions.loadCompanySuccess({ data: response, filters: payload.filters })),
          catchError((error) => of(SalesActions.loadCompanyFailure({ error, filters: payload.filters })))
        );
      })
    )
  );

  loadCompanySuccess$ = createEffect(() => 
    this.actions$.pipe(
      ofType(SalesActions.loadCompanySuccess),
      map((response: any) => {
        // Do something
        console.log(response);
      })
    ), { dispatch: false }
  );

  loadCompanyFailure$ = createEffect(() => 
    this.actions$.pipe(
      ofType(SalesActions.loadCompanyFailure),
      map((response: any) => {
        // Do something
        console.log(response);
      })
    ), { dispatch: false }
  );

}
