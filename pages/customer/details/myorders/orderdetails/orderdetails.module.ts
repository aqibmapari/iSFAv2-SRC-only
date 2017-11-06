import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { OrderDetailsPage } from './orderdetails';

@NgModule({
  declarations: [
    OrderDetailsPage,
  ],
  imports: [
    IonicPageModule.forChild(OrderDetailsPage),
  ],
})
export class OrderDetailsPageModule {}
