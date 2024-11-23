import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { AuthenticatedGuard } from './features/auth/guards/authenticated.guard';
import { GuestGuard } from './features/auth/guards/guest.guard';

const routes: Routes = [
  // {
  //   path: '',
  //   redirectTo: 'auth',
  //   pathMatch: 'full'
  // },
  // {
  //   path: 'sales',
  //   loadChildren: () => import('./features/sales/sales.module').then(m => m.SalesModule),
  //   canActivate: [AuthenticatedGuard],
  // },
  // {
  //   path: 'auth',
  //   loadChildren: () => import('./features/auth/auth.module').then(m => m.AuthModule),
  //   canActivate: [GuestGuard],
  // },
  // {
  //   path: 'kb',
  //   loadChildren: () => import('./features/kb/kb.module').then(m => m.KbModule),
  //   canActivate: [AuthenticatedGuard],
  // },
  // {
  //   path: 'hrm',
  //   loadChildren: () => import('./features/hrm/hrm.module').then(m => m.HrmModule),
  //   canActivate: [AuthenticatedGuard],
  // },
  {
    path: 'tabs',
    loadChildren: () => import('./tabs/tabs.module').then( m => m.TabsPageModule)
  }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
