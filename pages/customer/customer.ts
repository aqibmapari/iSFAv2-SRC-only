import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

import {CustomerListPage} from './customerlist/customerlist';
import { CustomerListMapPage } from './customermap/customerlistmap';
/**
 * Generated class for the CustomerPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage({name: 'Customer'})
@Component({
  selector: 'page-customer',
  templateUrl: 'customer.html',
})
export class CustomerPage {
	tabsArticle: Array<{title: string,value: string, root: any, icon: string}>;
	segmentModel: string;
	constructor(public navCtrl: NavController) {
		this.tabsArticle = [
			{ title: "Customer",value:"list", root: CustomerListPage, icon: "calendar" },
			{ title: "Map",value:"map", root: CustomerListMapPage, icon: "calendar" }
		];
		this.segmentModel = "list";
	}
	segmentValueChange(value:string):void {
		//console.log(value);
		this.segmentModel = value;
	}

}
