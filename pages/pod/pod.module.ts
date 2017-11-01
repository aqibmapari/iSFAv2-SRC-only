import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { PodPage } from './pod';

@NgModule({
  declarations: [
    PodPage,
  ],
  imports: [
    IonicPageModule.forChild(PodPage),
  ],
})
export class PodPageModule {}
