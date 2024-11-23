import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { AuthReducer, metaReducers } from './features/auth/states/reducers/auth.reducer';
import { AuthEffects } from './features/auth/states/effects/auth.effects';
import { HTTP_INTERCEPTORS, provideHttpClient, withInterceptors, withInterceptorsFromDi } from '@angular/common/http';
import { httpErrorInterceptor } from './core/interceptors/http-error.interceptor';
import { SalesReducer } from './features/sales/states/reducers/sales.reducer';
import { SalesEffects } from './features/sales/states/effects/sales.effects';
import { authorizationInterceptor } from './core/interceptors/authorization.interceptor';
import { NgHttpLoaderComponent, pendingRequestsInterceptor$ } from 'ng-http-loader';
import { SalesModule } from './features/sales/sales.module';
import { AuthModule } from './features/auth/auth.module';

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    NgHttpLoaderComponent,
    
    IonicModule.forRoot({
      mode: 'md',
    }), 
    AppRoutingModule, 
    StoreModule.forRoot({
      auth: AuthReducer,
      sales: SalesReducer,
    }, { metaReducers }),
    EffectsModule.forRoot([
      AuthEffects,
      SalesEffects,
    ]),
  ],
  providers: [
    provideHttpClient(
      withInterceptors([
        httpErrorInterceptor,
        authorizationInterceptor,
        pendingRequestsInterceptor$,
      ]),
    ),
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
