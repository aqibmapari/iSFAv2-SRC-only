import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { CustomerPage } from './customer';
import { TabsComponentModule } from "../../components/tabs/tabs.module";
import {CustomerListPage} from './customerlist/customerlist';
import { CustomerListMapPage } from './customermap/customerlistmap';

@NgModule({
  declarations: [
    CustomerPage,
    CustomerListPage,
    CustomerListMapPage
  ],
  imports: [
    TabsComponentModule,
    IonicPageModule.forChild(CustomerPage),
  ],
})
export class CustomerPageModule {}
