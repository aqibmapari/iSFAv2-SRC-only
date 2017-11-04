import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { TabsComponentModule } from "../../../components/tabs/tabs.module";

import { CustomerDetailsPage } from './customerdetails';
import { CustomerDetails } from './customerdetails/customerdetails.component';
import {CustomerAttributes} from './attributes/customerattributes.component';
import {CustomerActivity} from './activity/customeractivity.component';
import {CustomerContact} from './contact/customercontact.component';
import {CustomerCredit} from './credit/customercredit.component';
import {CustomerMap} from './map/customermap.component';
import {CustomerMyOrders} from './myorders/customermyorders.component';
import {CustomerOrders} from './orders/customerorders.component';
import {CustomerReports} from './reports/customerreports.component';
import {AddContactPage} from './contact/addContact/addcontact';
import {OrderDetailsPage} from './myorders/orderdetails/orderdetails';
import {InvDetailsPage} from './credit/invdetails/invdetails';

@NgModule({
    declarations: [
        CustomerDetailsPage,
        CustomerDetails,
        CustomerAttributes,
        CustomerActivity,
        CustomerContact,
        CustomerCredit,
        CustomerMap,
        CustomerMyOrders,
        CustomerOrders,
        CustomerReports,
        AddContactPage,
        OrderDetailsPage,
        InvDetailsPage
    ],
    imports: [
        TabsComponentModule,
        IonicPageModule.forChild(CustomerDetailsPage)
    ]
})
export class CustomerDetailsPageModule {}
