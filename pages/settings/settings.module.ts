import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { Device } from '@ionic-native/device';
import { AppVersion } from '@ionic-native/app-version';
import { TabsComponentModule } from "../../components/tabs/tabs.module";
import { StickyDividerComponentModule } from "../../components/stickydivider/stickydivider.module";
import { SettingsPage } from './settings';
import { SettingsAbout } from "./about/settingsabout";
import { SettingsAuthorizations } from "./authorizations/settingsauthorizations";
import { SettingsBackend } from "./backend/settingsbackend";
import { SettingsDefault } from "./default/settingsdefault";

@NgModule({
  declarations: [
    SettingsPage,
    SettingsAbout,
    SettingsAuthorizations,
    SettingsBackend,
    SettingsDefault
  ],
  imports: [
    TabsComponentModule,
    StickyDividerComponentModule,
    IonicPageModule.forChild(SettingsPage),
  ],
  providers:[
    Device,
    AppVersion
  ]
})
export class SettingsPageModule {}
