import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { PriceListPage } from './pricelist';

@NgModule({
  declarations: [
    PriceListPage,
  ],
  imports: [
    IonicPageModule.forChild(PriceListPage),
  ],
})
export class PriceListPageModule {}
