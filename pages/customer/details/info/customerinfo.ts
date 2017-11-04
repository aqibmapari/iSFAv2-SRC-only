import { Component } from '@angular/core';
import { NavParams } from 'ionic-angular';
import {UtilService} from '../../../../providers/util.service';

@Component({
	selector: 'customer-info',
	templateUrl: 'customerinfo.html'
})
export class CustomerInfo{
	selectedCustomer : any;
	constructor(private utilService: UtilService, private navParams: NavParams) {
		this.selectedCustomer = navParams.get('selectedCustomer');
	}
}
