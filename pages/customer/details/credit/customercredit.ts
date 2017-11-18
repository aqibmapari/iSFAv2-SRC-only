import { Component } from '@angular/core';
import { NavParams, ModalController, AlertController } from 'ionic-angular';

import {UtilService} from '../../../../providers/util.service';
import { DatabaseService } from "../../../../providers/database.service";
import { SharedService } from "../../../../providers/sharedservice";

@Component({
	selector: 'customer-credit',
	templateUrl: 'customercredit.html'
})
export class CustomerCredit {
	selectedCustomer : any;
	creditModel : any;
	constructor(private utilService: UtilService,
		private navParams: NavParams,
		public modalCtrl: ModalController,
		private databaseService: DatabaseService,
		private sharedService: SharedService,
		private alertCtrl: AlertController) {
		this.selectedCustomer = navParams.get('selectedCustomer');
		this.creditModel = {
			creditlimit: 0.00,
			limitused: 0.00,
			receivable: 0.00,
			avlblcredit: 0.00,
			totoverdue: 0.00,
			doctype: "Cheque",
			docdate: this.utilService.returnDateString(new Date()),
			invoices: [
				// {no: "123489",amt: "25,438.00", date: "01.06.2017", duedate: "09.11.2017", balance: "25,438.00", recvd: "0.00", torcv: "", color: "danger"},
				// {no: "345636",amt: "54,675.00", date: "01.06.2017", duedate: "09.11.2017", balance: "54,675.00", recvd: "0.00", torcv: "", color: "secondary"}
			],
			invoiceTotal: {no: "",amt: 0.00, date: "", duedate: "", balance: 0.00, recvd: 0.00, torcv: 0.00, color: ""}
		};
	}
	ngOnInit() {
		var items = [];
		this.creditModel['invoices'] = [];
		let pernr = this.sharedService.getPernr();
		let kunnr = this.selectedCustomer.kunnr;
		let zterm = parseInt(this.selectedCustomer.zterm,10);
		zterm = isNaN(zterm) ? 0 : zterm;
		let selQuery = "select distinct ccl.creditlimit,ccl.used,ccl.receivable,cc.invno,cc.invdate,cc.invamount,cc.amountrec,"+
		"cc.date,cc.balance,cc.duedate,cc.invdatetime,cc.kunnr from custcreditlimitmst ccl "+
		"LEFT OUTER JOIN custcreditmst cc ON cc.kunnr=ccl.kunnr and cc.pernr=ccl.pernr where ccl.pernr=? and ccl.kunnr=? order by cc.invdatetime"
		this.databaseService.selectComplexQuery(selQuery,[this.utilService.encode64(pernr),this.utilService.encode64(kunnr)],0)
		// this.databaseService.selectTableQuery('custcreditmst',
		// '*',
		// 'WHERE pernr=? and kunnr=?',[this.utilService.encode64(pernr),this.utilService.encode64(kunnr)],0)
		.then((results) => {
			console.log(JSON.stringify(results));
			// var arr = [];
				if(results['rows'] && results['rows']['length'] !== 0){
					for (var i=0; i<results['rows']['length']; i++ ){
						var row = results['rows']['item'](i);
						if(i === 0){
							this.creditModel['creditlimit'] = parseFloat(this.utilService.decode64(row.creditlimit));
							this.creditModel['limitused'] = parseFloat(this.utilService.decode64(row.used));
							this.creditModel['receivable'] = parseFloat(this.utilService.decode64(row.receivable));
							this.creditModel['avlblcredit'] = this._getAvlblCredit();
						}
						if(row.invno !== null){
							var invoice = {
								no: this.utilService.decode64(row.invno),
								amt: parseFloat(this.utilService.decode64(row.invamount)),
								date: (row.invdate),
								balance: 0.00,
								duedate: this._calculateDueDate(row.invdatetime, zterm),
								recvd: parseFloat(this.utilService.decode64(row.amountrec)),
								torcv: "",
								color: ""
							}
							invoice.amt = isNaN(invoice.amt) ? 0.00 : invoice.amt;
							invoice.recvd = isNaN(invoice.recvd) ? 0.00 : invoice.recvd;
							invoice['balance'] = this._getBalanceAmt(invoice);
							invoice.color = this._getRowColor(invoice);
							this._calculateAllTotal(invoice);
							this.creditModel['invoices'].push(invoice);
						}
						// items.push(obj);
					};
					// this.groupedObjects = this.utilService.groupObjects(items,'name');
				}
				console.log(this.creditModel)
			}, (err) => {
				console.log(JSON.stringify(err));
		});
	}
	_getAvlblCredit(){
		this.creditModel['creditlimit'] = isNaN(this.creditModel['creditlimit']) ? 0.00 : this.creditModel['creditlimit'];
		this.creditModel['limitused'] = isNaN(this.creditModel['limitused']) ? 0.00 : this.creditModel['limitused'];
		this.creditModel['receivable'] = isNaN(this.creditModel['receivable']) ? 0.00 : this.creditModel['receivable'];
		return this.creditModel['creditlimit'] - this.creditModel['limitused'];
	}
	_getBalanceAmt(invoice){
		return (invoice.amt - invoice.recvd)
	}
	_calculateDueDate(invdatetime, zterm){
		return  parseInt(invdatetime,10) + (zterm * 86400000);
	}
	_getRowColor(invoice){
		let currDateTime = new Date().getTime();
		if(invoice.balance <= 0) return "";
		if(invoice.duedate < currDateTime) {
			this.creditModel['totoverdue'] += invoice.balance;
			return "danger"
		}
		else if(invoice.duedate - currDateTime <= 10) return "energized";
		else return "";
	}
	_calculateAllTotal(invoice){
		this.creditModel.invoiceTotal.amt += invoice.amt;
		this.creditModel.invoiceTotal.recvd += invoice.recvd;
		this.creditModel.invoiceTotal.balance += invoice.balance;
	}
	showInvDetails(invoice){
		invoice.details = [
			// {maktx: "MCCAIN BRONZE 9 X 9 2.5 KG", matnr: "202223", invno: "0094518389", invvalue: "1,005.00", invqty: "300.0 UOS"},
			// {maktx: "MCCAIN BRONZE 9 X 9 5 KG", matnr: "202224", invno: "0094518388", invvalue: "2,561.54", invqty: "500.0 UOS"}
		];
		let pernr = this.sharedService.getPernr();
		let kunnr = this.selectedCustomer.kunnr;
		this.databaseService.selectTableQuery('invdetailsmst',
		'vbelnf, vbelni,matnr,qtyuom,invdate,qty,maktx,recqty,podstatus,netwr,pernr',
		'WHERE pernr=? and vbelni=?',[this.utilService.encode64(pernr),this.utilService.encode64(invoice.no)],0)
		.then((results) => {
			console.log(JSON.stringify(results));
			// var arr = [];
				if(results['rows'] && results['rows']['length'] !== 0){
					for (var i=0; i<results['rows']['length']; i++ ){
						var row = results['rows']['item'](i);

							var invoiceDet = {
								invno: invoice.no,
								matnr: (this.utilService.decode64(row.matnr)),
								maktx: this.utilService.decode64(row.maktx),
								invvalue: parseFloat(this.utilService.decode64(row.netwr)),
								invqty: this.utilService.decode64(row.qtyuom)
							}
							invoice.details.push(invoiceDet);

						// items.push(obj);
					};
					let modal = this.modalCtrl.create("InvDetailsPage",{invdetails: invoice});
					modal.present();
					// this.groupedObjects = this.utilService.groupObjects(items,'name');
				}
				else{
					this._showAlert();
				}
			}, (err) => {
				console.log(JSON.stringify(err));
		});
	}
	_showAlert() {
    let alert = this.alertCtrl.create({
      title: 'Alert',
      subTitle: 'Invoice details not available',
      buttons: ['OK']
    });
    alert.present();
  }
}
