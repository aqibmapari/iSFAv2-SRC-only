import { Component } from '@angular/core';

import { IonicPage,NavController } from 'ionic-angular';
import { CustomerInfo } from './info/customerinfo';
import {CustomerAttributes} from './attributes/customerattributes';
import {CustomerActivity} from './activity/customeractivity';
import {CustomerContact} from './contact/customercontact';
import {CustomerCredit} from './credit/customercredit';
import {CustomerMap} from './map/customermap';
import {CustomerMyOrders} from './myorders/customermyorders';
import {CustomerOrders} from './orders/customerorders';
import {CustomerReports} from './reports/customerreports';

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
			{ title: "Customer",value:"customer", root: CustomerInfo, icon: "calendar" },
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
