import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { MyActivityPage } from './myactivity';

@NgModule({
  declarations: [
    MyActivityPage,
  ],
  imports: [
    IonicPageModule.forChild(MyActivityPage),
  ],
})
export class MyActivityPageModule {}
