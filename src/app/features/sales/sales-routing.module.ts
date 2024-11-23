import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CashierPosScreenComponent } from './screens/cashier/cashier-pos-screen/cashier-pos-screen.component';
import { CustomerHomepageScreenComponent } from './screens/customer/customer-homepage-screen/customer-homepage-screen.component';
import { CustomerOrderHistoryScreenComponent } from './screens/customer/customer-order-history-screen/customer-order-history-screen.component';
import { CustomerTakeOrderScreenComponent } from './screens/customer/customer-take-order-screen/customer-take-order-screen.component';
import { CustomerOrderDetailScreenComponent } from './screens/customer/customer-order-detail-screen/customer-order-detail-screen.component';
import { CustomerCompanyListScreenComponent } from './screens/customer/customer-company-list-screen/customer-company-list-screen.component';

const routes: Routes = [
  {
    path: 'pos',
    children: [
      {
        path: '',
        component: CashierPosScreenComponent,
      }
    ]
  },
  {
    path: 'customer',
    children: [
      {
        path: '',
        component: CustomerHomepageScreenComponent,
      },
      {
        path: 'history',
        children: [
          {
            path: '',
            component: CustomerOrderHistoryScreenComponent,
          },
          {
            path: ':id',
            component: CustomerOrderDetailScreenComponent,
          }
        ]
      },
      {
        path: 'scanner',
        component: CustomerTakeOrderScreenComponent,
      },
      {
        path: 'company',
        component: CustomerCompanyListScreenComponent,
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SalesRoutingModule { }
