import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { InvDetailsPage } from './invdetails';

@NgModule({
  declarations: [
    InvDetailsPage,
  ],
  imports: [
    IonicPageModule.forChild(InvDetailsPage),
  ],
})
export class InvDetailsPageModule {}
