import { Component } from '@angular/core';
import { NavParams } from 'ionic-angular';
import {UtilService} from '../../../../providers/util.service';

@Component({
	selector: 'customer-details',
	templateUrl: 'customerdetails.html'
})
export class CustomerDetails {
	selectedCustomer : any;
	constructor(private utilService: UtilService, private navParams: NavParams) {
		this.selectedCustomer = navParams.get('selectedCustomer');
	}
}
