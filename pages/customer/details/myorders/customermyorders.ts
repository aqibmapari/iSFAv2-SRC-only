import { Component } from '@angular/core';
import { NavParams, ModalController } from 'ionic-angular';

import {UtilService} from '../../../../providers/util.service';

@Component({
	selector: 'customer-myorders',
	templateUrl: 'customermyorders.html'
})
export class CustomerMyOrders {
	selectedCustomer : any;
	orders : any;
	constructor(private utilService: UtilService, private navParams: NavParams,
	public modalCtrl: ModalController) {
		this.selectedCustomer = navParams.get('selectedCustomer');
		this.orders = [
			{no: "1163", datetime: "12.07.2017/ 10:42 AM", status: "Sent", statusdatetime: "12.07.2017/ 11:35 AM", salesorganisation: "1000", distchannel: "30", division: "00", ordertype:"YSO", customer:this.selectedCustomer.name1, shipto: this.selectedCustomer.name1, reference: "", deldate:"14.07.2017"},
			{no: "1164", datetime: "13.07.2017/ 11:48 AM", status: "Pending", statusdatetime: "13.07.2017/ 11:49 AM", salesorganisation: "1000", distchannel: "30", division: "00", ordertype:"YSO", customer:this.selectedCustomer.name1, shipto: this.selectedCustomer.name1, reference: "", deldate:"14.07.2017"},
			{no: "1165", datetime: "13.07.2017/ 11:57 AM", status: "Draft", statusdatetime: "13.07.2017/ 11:59 AM", salesorganisation: "1000", distchannel: "30", division: "00", ordertype:"YSO", customer:this.selectedCustomer.name1, shipto: this.selectedCustomer.name1, reference: "", deldate:"14.07.2017"},
			{no: "1166", datetime: "13.07.2017/ 12:42 PM", status: "Pending", statusdatetime: "13.07.2017/ 12:42 PM", salesorganisation: "1000", distchannel: "30", division: "00", ordertype:"YSO", customer:this.selectedCustomer.name1, shipto: this.selectedCustomer.name1, reference: "", deldate:"14.07.2017"}
		]
	}
	goToDetails(order){
		let modal = this.modalCtrl.create("OrderDetailsPage",{order: order});
		modal.present();
	}
}
