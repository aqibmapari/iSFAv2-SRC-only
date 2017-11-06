import { Component } from '@angular/core';
import { NavParams, ModalController } from 'ionic-angular';

import {UtilService} from '../../../../providers/util.service';

@Component({
	selector: 'customer-credit',
	templateUrl: 'customercredit.html'
})
export class CustomerCredit {
	selectedCustomer : any;
	creditModel : any;
	constructor(private utilService: UtilService,
		private navParams: NavParams,
		public modalCtrl: ModalController) {
		this.selectedCustomer = navParams.get('selectedCustomer');
		this.creditModel = {
			creditlimit: "100,000.00",
			limitused: "17,315.00",
			receivable: "17,315.00",
			avlblcredit: "82,685.00",
			totoverdue: "21,540.00",
			doctype: "Cheque",
			docdate: "2017-07-12",
			invoices: [
				{no: "123489",amt: "25,438.00", date: "01.06.2017", duedate: "09.11.2017", balance: "25,438.00", recvd: "0.00", torcv: "", color: "danger"},
				{no: "345636",amt: "54,675.00", date: "01.06.2017", duedate: "09.11.2017", balance: "54,675.00", recvd: "0.00", torcv: "", color: "secondary"}
			],
			invoiceTotal: {no: "",amt: "94,675.00", date: "", duedate: "", balance: "94,675.00", recvd: "0.00", torcv: "", color: ""}
		};
	}
	showInvDetails(invoice){
		invoice.details = [
			{maktx: "MCCAIN BRONZE 9 X 9 2.5 KG", matnr: "202223", invno: "0094518389", invvalue: "1,005.00", invqty: "300.0 UOS"},
			{maktx: "MCCAIN BRONZE 9 X 9 5 KG", matnr: "202224", invno: "0094518388", invvalue: "2,561.54", invqty: "500.0 UOS"}
		];
		let modal = this.modalCtrl.create("InvDetailsPage",{invdetails: invoice});
		modal.present();
	}
}
