import { Component } from '@angular/core';

import { NavParams } from 'ionic-angular';
import {UtilService} from '../../../../providers/util.service';

@Component({
	selector: 'customer-attributes',
	templateUrl: 'customerattributes.html'
})
export class CustomerAttributes {
	selectedCustomer : any;
	constructor(private utilService: UtilService, private navParams: NavParams) {
		this.selectedCustomer = navParams.get('selectedCustomer');
	}
}
