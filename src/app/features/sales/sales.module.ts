import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SalesRoutingModule } from './sales-routing.module';
import { IonicModule } from '@ionic/angular';
import { CustomerHomepageScreenComponent } from './screens/customer/customer-homepage-screen/customer-homepage-screen.component';
import { CustomerOrderHistoryScreenComponent } from './screens/customer/customer-order-history-screen/customer-order-history-screen.component';
import { CustomerScannerComponent } from './components/customer/customer-scanner/customer-scanner.component';
import { CustomerTakeOrderScreenComponent } from './screens/customer/customer-take-order-screen/customer-take-order-screen.component';
import { CustomerOrderDetailScreenComponent } from './screens/customer/customer-order-detail-screen/customer-order-detail-screen.component';
import { CustomerQueueFormComponent } from './components/customer/customer-queue-form/customer-queue-form.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CustomerCompanyListScreenComponent } from './screens/customer/customer-company-list-screen/customer-company-list-screen.component';

@NgModule({
  declarations: [
    CustomerHomepageScreenComponent,
    CustomerOrderHistoryScreenComponent,
    CustomerOrderDetailScreenComponent,
    CustomerTakeOrderScreenComponent,
    CustomerScannerComponent,
    CustomerQueueFormComponent,
    CustomerCompanyListScreenComponent,
  ],
  imports: [
    CommonModule,
    SalesRoutingModule,
    IonicModule,
    FormsModule,
    ReactiveFormsModule,
  ]
})
export class SalesModule { }
