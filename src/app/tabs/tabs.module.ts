import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { TabsPageRoutingModule } from './tabs-routing.module';

import { TabsPage } from './tabs.page';
import { CustomerHomepageScreenComponent } from '../features/sales/screens/customer/customer-homepage-screen/customer-homepage-screen.component';
import { SalesModule } from '../features/sales/sales.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    TabsPageRoutingModule,
    SalesModule,
  ],
  declarations: [
    TabsPage,
  ]
})
export class TabsPageModule {}
