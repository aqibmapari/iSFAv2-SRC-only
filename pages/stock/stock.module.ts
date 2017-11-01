import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { StockStatusPage } from './stock';

@NgModule({
  declarations: [
    StockStatusPage,
  ],
  imports: [
    IonicPageModule.forChild(StockStatusPage),
  ],
})
export class StockStatusPageModule {}
