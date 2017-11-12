import { Component } from '@angular/core';
import { NavParams, ModalController  } from 'ionic-angular';

import {UtilService} from '../../../../providers/util.service';
import {SharedService} from '../../../../providers/sharedservice';
import { DatabaseService } from "../../../../providers/database.service";

@Component({
  selector: 'customer-contact',
  templateUrl: 'customercontact.html'
})
export class CustomerContact {
  selectedCustomer: any;
	groupedObjects: Array<Object>;
  constructor(private utilService: UtilService,
		private navParams: NavParams,
		private sharedService: SharedService,
		private modalCtrl: ModalController,
		private databaseService: DatabaseService) {
    this.selectedCustomer = navParams.get('selectedCustomer');
  }
	ngOnInit() {
		var items = [];
		let pernr = this.sharedService.getPernr();
		let kunnr = this.selectedCustomer.kunnr;
		this.databaseService.selectTableQuery('customercontactmst',
		'*',
		'WHERE pernr=? and kunnr=?',[this.utilService.encode64(pernr),this.utilService.encode64(kunnr)],0)
		.then((results) => {
			console.log(JSON.stringify(results));
			// var obj = {};
			// obj['pernr'] = pernr;
			// obj['kunnr'] = "102345";
			// obj['name'] = "Aqib";
			// obj['designation'] = "Developer";
			// obj['phone'] = "02226524538";
			// obj['mobile'] = "9773562113";
			// obj['fax'] = "27005734";
			// obj['photo'] = "assets/img/logo.png";
			// obj['email'] = "aqib.m@intellectbizware.com";
			// obj['id'] = "1";
			// items.push(obj);

			// var obj1 = {};
			// obj1['pernr'] = pernr;
			// obj1['kunnr'] = "102345";
			// obj1['name'] = "Mahendra";
			// obj1['designation'] = "Designer";
			// obj1['phone'] = "02226524538";
			// obj1['mobile'] = "9773562113";
			// obj1['fax'] = "27005734";
			// obj1['photo'] = "assets/img/logo.png";
			// obj1['email'] = "mahendra.a@intellectbizware.com";
			// obj1['id'] = "2";
			// items.push(obj1);
			if(results['rows'] && results['rows']['length'] !== 0){
				for (var i=0; i<results['rows']['length']; i++ ){
					var row = results['rows']['item'](i);
					var obj = {};
					obj['pernr'] = pernr;
					obj['kunnr'] = kunnr;
					obj['name'] = this.utilService.decode64(row.name);
					obj['designation'] = this.utilService.decode64(row.designation);
					obj['tel'] = this.utilService.decode64(row.tel);
					obj['mobileno'] = this.utilService.decode64(row.mobileno);
					obj['fax'] = this.utilService.decode64(row.fax);
					obj['photo'] = "assets/img/logo.png";
					obj['emailid'] = this.utilService.decode64(row.emailid);
					obj['typeid'] = (row.typeid);
					obj['datetime'] = row.datetime;
					items.push(obj);
				};
				this.groupedObjects = this.utilService.groupObjects(items,'name');
			}
		}, (err) => {
			console.log(JSON.stringify(err));
		});
    }
		addContact(){
			let modal = this.modalCtrl.create("AddContactPage",{contact: {blankImage: "assets/img/whiteBG.png"}}, {showBackdrop: false});
			modal.present();
		}
		pickContact(){

		}
		editContact(obj){
      obj.blankImage = "assets/img/whiteBG.png";
      let modal = this.modalCtrl.create("AddContactPage",{contact: obj});
			modal.present();
		}
		deleteContact(obj){

		}
		emailContact(obj){

		}
		callContact(obj){

		}
}
