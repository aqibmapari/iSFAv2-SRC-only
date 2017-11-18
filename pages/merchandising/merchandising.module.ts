import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { MerchandisingPage } from './merchandising';

@NgModule({
  declarations: [
    MerchandisingPage,
  ],
  imports: [
    IonicPageModule.forChild(MerchandisingPage),
  ],
})
export class MerchandisingPageModule {}
