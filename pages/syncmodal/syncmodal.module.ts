import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { SyncModalPage } from './syncmodal';

@NgModule({
  declarations: [
    SyncModalPage,
  ],
  imports: [
    IonicPageModule.forChild(SyncModalPage),
  ],
})
export class SyncModalPageModule {}
