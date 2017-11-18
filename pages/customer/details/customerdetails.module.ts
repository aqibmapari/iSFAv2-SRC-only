import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { TabsComponentModule } from "../../../components/tabs/tabs.module";
import { CommaFormatPipeModule } from "../../../pipes/comma-format/comma-format.module";
import { CustomerDetailsPage } from './customerdetails';
import { CustomerInfo } from './info/customerinfo';
import {CustomerAttributes} from './attributes/customerattributes';
import {CustomerActivity} from './activity/customeractivity';
import {CustomerContact} from './contact/customercontact';
import {CustomerCredit} from './credit/customercredit';
import {CustomerMap} from './map/customermap';
import {CustomerMyOrders} from './myorders/customermyorders';
import {CustomerOrders} from './orders/customerorders';
import {CustomerReports} from './reports/customerreports';

@NgModule({
    declarations: [
        CustomerDetailsPage,
        CustomerInfo,
        CustomerAttributes,
        CustomerActivity,
        CustomerContact,
        CustomerCredit,
        CustomerMap,
        CustomerMyOrders,
        CustomerOrders,
        CustomerReports
    ],
    imports: [
        TabsComponentModule,
        CommaFormatPipeModule,
        IonicPageModule.forChild(CustomerDetailsPage)
    ]
})
export class CustomerDetailsPageModule {}
