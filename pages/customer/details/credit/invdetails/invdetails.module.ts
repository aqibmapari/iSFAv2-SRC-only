import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { InvDetailsPage } from './invdetails';
import { CommaFormatPipeModule } from "../../../../../pipes/comma-format/comma-format.module";
import { StickyDividerComponentModule } from "../../../../../components/stickydivider/stickydivider.module";

@NgModule({
  declarations: [
    InvDetailsPage,
  ],
  imports: [
    CommaFormatPipeModule,
    StickyDividerComponentModule,
    IonicPageModule.forChild(InvDetailsPage),
  ],
})
export class InvDetailsPageModule {}
