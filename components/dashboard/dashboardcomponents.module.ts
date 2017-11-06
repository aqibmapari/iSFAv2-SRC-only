import { NgModule } from '@angular/core';
import { IonicModule } from 'ionic-angular';
import { CommaFormatPipeModule } from "../../pipes/comma-format/comma-format.module";
import { TargetAcheivedComponent } from './target-acheived/target-acheived';
import { OSAgingComponent } from "./os-aging/os-aging";
import { RegularTop10Component } from "./regular-top10/regular-top10";
import { Top10SalesComponent } from "./top10-sales/top10-sales";
@NgModule({
  declarations: [
    TargetAcheivedComponent,
    OSAgingComponent,
    RegularTop10Component,
    Top10SalesComponent
  ],
  imports: [CommaFormatPipeModule,IonicModule],
  exports: [
    TargetAcheivedComponent,
    OSAgingComponent,
    RegularTop10Component,
    Top10SalesComponent
  ]
})
export class DashboardComponentModule { }
