import { Component } from '@angular/core';

import { IonicPage,NavController } from 'ionic-angular';
import { CustomerDetails } from './customerdetails/customerdetails.component';
import {CustomerAttributes} from './attributes/customerattributes.component';
import {CustomerActivity} from './activity/customeractivity.component';
import {CustomerContact} from './contact/customercontact.component';
import {CustomerCredit} from './credit/customercredit.component';
import {CustomerMap} from './map/customermap.component';
import {CustomerMyOrders} from './myorders/customermyorders.component';
import {CustomerOrders} from './orders/customerorders.component';
import {CustomerReports} from './reports/customerreports.component';

@IonicPage({name: 'CustomerDetailsPage'})
@Component({
	selector: 'page-customerdetails',
	templateUrl: 'customerdetails.html'
})
export class CustomerDetailsPage {
	tabs: Array<{title: string,value: string, root: any, icon: string}>;
	segmentModel: string;
	constructor(public navCtrl: NavController) {
		this.tabs = [
			{ title: "Customer",value:"customer", root: CustomerDetails, icon: "calendar" },
			{ title: "Map",value:"map", root: CustomerMap, icon: "calendar" },
			{ title: "Contact",value:"contact", root: CustomerContact, icon: "calendar" },
			{ title: "Attributes",value:"attributes", root: CustomerAttributes, icon: "calendar" },
			{ title: "Credit",value:"credit", root: CustomerCredit, icon: "calendar" },
			{ title: "My Orders",value:"myorders", root: CustomerMyOrders, icon: "calendar" },
			{ title: "Order",value:"orders", root: CustomerOrders, icon: "calendar" },
			{ title: "Activity",value:"activity", root: CustomerActivity, icon: "calendar" },
			{ title: "Reports",value:"reports", root: CustomerReports, icon: "calendar" }
		];
		this.segmentModel = "customer";
	}
	segmentValueChange(value:string):void {
		//console.log(value);
		this.segmentModel = value;
	}
}
