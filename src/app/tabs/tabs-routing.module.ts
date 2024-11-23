import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { TabsPage } from './tabs.page';
import { CustomerHomepageScreenComponent } from '../features/sales/screens/customer/customer-homepage-screen/customer-homepage-screen.component';
import { CustomerOrderHistoryScreenComponent } from '../features/sales/screens/customer/customer-order-history-screen/customer-order-history-screen.component';
import { CustomerCompanyListScreenComponent } from '../features/sales/screens/customer/customer-company-list-screen/customer-company-list-screen.component';

const routes: Routes = [
  {
    path: '',
    component: TabsPage,
    children: [
        {
          path: 'home',
          component: CustomerHomepageScreenComponent,
        },
        {
          path: 'history',
          component: CustomerOrderHistoryScreenComponent,
        },
        {
          path: 'outlet',
          component: CustomerCompanyListScreenComponent,
        },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TabsPageRoutingModule {}
