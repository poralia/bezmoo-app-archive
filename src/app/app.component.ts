import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { AuthState } from './features/auth/states/reducers/auth.reducer';
import { AuthActions } from './features/auth/states/actions/auth.actions';
@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {

  public appPages = [
    { title: 'Home', url: '/sales/customer', icon: 'home' },
    { title: 'History', url: '/sales/customer/history', icon: 'timer' },
    { title: 'Outlet', url: '/sales/customer/company', icon: 'business' },
    // { title: 'Account', url: '/folder/outbox', icon: 'person' },
    // { title: 'Favorites', url: '/folder/favorites', icon: 'heart' },
    // { title: 'Archived', url: '/folder/archived', icon: 'archive' },
    // { title: 'Trash', url: '/folder/trash', icon: 'trash' },
    // { title: 'Spam', url: '/folder/spam', icon: 'warning' },
  ];
  public currentUrl: string = this.router.url;
  public showMenu: boolean = true;

  constructor(
    private router: Router,
    private store: Store<AuthState>,
  ) {
    // Subscribe to the router events observable
    this.router.events.subscribe((event) => {
      if ( event.constructor.name === 'NavigationEnd' ) {
        this.currentUrl = this.router.url;
        
        if ( this.currentUrl.includes('auth') ) {
          this.showMenu = false;
        }
      }
    });
  }

  onLogoutHandler(): void {
    this.store.dispatch(AuthActions.logout());
  }

}
