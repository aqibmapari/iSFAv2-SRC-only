import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { TabsComponentModule } from "../../components/tabs/tabs.module";
import { StickyDividerComponentModule } from "../../components/stickydivider/stickydivider.module";
import { DashboardComponentModule } from "../../components/dashboard/dashboardcomponents.module";
import { DashboardPage } from './dashboard';
import { DashboardMonthPage } from "./month/dashboardmonth";
import { DashboardYearPage } from "./year/dashboardyear";

@NgModule({
  declarations: [
    DashboardPage,
    DashboardMonthPage,
    DashboardYearPage
  ],
  imports: [
    TabsComponentModule,
    StickyDividerComponentModule,
    DashboardComponentModule,
    IonicPageModule.forChild(DashboardPage),
  ],
})
export class DashboardPageModule {}
