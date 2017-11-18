import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { MarketPlanPage } from './marketplan';

@NgModule({
  declarations: [
    MarketPlanPage,
  ],
  imports: [
    IonicPageModule.forChild(MarketPlanPage),
  ],
})
export class MarketPlanPageModule {}
