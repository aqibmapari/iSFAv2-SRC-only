import { Component } from '@angular/core';

import { NavController } from 'ionic-angular';
import {UtilService} from '../../../providers/util.service';
import {DatabaseService} from '../../../providers/database.service';
import {SharedService} from '../../../providers/sharedservice';
// import { CustomerDetailsHeader } from '../../details/customerdetailsheader.component';

@Component({
	selector: 'customer-list',
	templateUrl: 'customerlist.html'
})
export class CustomerListPage {
	items = [];
    groupedObjects = [];
	constructor(public navCtrl: NavController,
		private utilService: UtilService,
		public databaseService: DatabaseService,
		public sharedService: SharedService) {
			this.items= [
				{
					"pernr":"40143",
					"kunnr":"510108",
					"name1":"MERIDIEN HOTEL-MADAINA","address":"","custclass":"HoReCa","branch":"2703","chain":"Common chain for GT","custgrp":"Food Service","custstatus":"","custtype":"","popclass":"","latitude":"24.4882","longitude":"39.56312","city":"MADINA","GFORM_TEXT":"?????? ????????? 01","BRSCH_TEXT":"CONTINENTAL","BRAN1_TEXT":"burger\/sandwiches","VKGRP_TEXT":"Madina 2","KATR7_TEXT":"HORECA - BU5","CONTACT_NAME":"FAYAS KHAN","EMAIL":"izhar.ahmad@binzagr.com.sa","NAME_CO":"LE MERIDIEN HOTELMADINA","cflag":"G","crblb":"X","website":"","kvgr5":"","areacode":"","area":"","Status_Flag":"","count":"107298","zterm":"30 Days","status":"X"},{"typeid":"10167","pernr":"0","kunnr":"510109","name1":"ANWAR AL MEDINAH MOVENPICK","address":"","custclass":"HoReCa","branch":"2703","chain":"Common chain for GT","custgrp":"Food Service","custstatus":"","custtype":"","popclass":"","latitude":"24.47148","longitude":"39.6078","city":"MADINA","GFORM_TEXT":"?????? ????????? 01","BRSCH_TEXT":"CONTINENTAL","BRAN1_TEXT":"burger\/sandwiches","VKGRP_TEXT":"Madina 2","KATR7_TEXT":"HORECA - BU5","CONTACT_NAME":"MUSTAFA","EMAIL":"izhar.ahmad@binzagr.com.sa","NAME_CO":"ANWAR AL MEDINAH MÖVENPICK HOTEL","cflag":"G","crblb":"","website":"","kvgr5":"","areacode":"","area":"","Status_Flag":"","count":"107298","zterm":"60 Days","status":""},{"typeid":"10170","pernr":"0","kunnr":"510112","name1":"DALLAH","address":"INDSTAIRAL AREA","custclass":"HoReCa","branch":"2703","chain":"Common chain for GT","custgrp":"Food Service","custstatus":"","custtype":"","popclass":"","latitude":"24.47223","longitude":"39.61206","city":"MADINA","GFORM_TEXT":"?????? ????????? 01","BRSCH_TEXT":"CONTINENTAL","BRAN1_TEXT":"salad\/sea food\/sauce","VKGRP_TEXT":"Madina 2","KATR7_TEXT":"HORECA - BU5","CONTACT_NAME":"","EMAIL":"izhar.ahmad@binzagr.com.sa","NAME_CO":"DALLAH TAIBAH HOTEL","cflag":"G","crblb":"","website":"","kvgr5":"","areacode":"","area":"","Status_Flag":"","count":"107298","zterm":"45 Days","status":""}
			]
			this.groupedObjects = this.utilService.groupObjects(this.items,'name1');
	}
	ngOnInit() {
		this.items = [];
		var pernr = this.sharedService.getPernr();
		this.databaseService.selectTableQuery('customermst',
		'*',
		'WHERE pernr=?',[this.utilService.encode64(pernr)],0)
		.then((results) => {
			// console.log(JSON.stringify(results));
			if(results['rows'] && results['rows'].length !== 0){
				for(var i=0; i<results['rows'].length; i++){
					var row = results['rows']['item'](i);
					var obj = {};
					obj['pernr'] = pernr;
					obj['kunnr'] = this.utilService.decode64(row.kunnr);
					obj['name1'] = this.utilService.decode64(row.name1);
					obj['address'] = this.utilService.decode64(row.address);
					obj['custclass'] = this.utilService.decode64(row.custclass);
					obj['branch'] = this.utilService.decode64(row.branch);
					obj['chain'] = this.utilService.decode64(row.chain);
					obj['popclass'] = this.utilService.decode64(row.popclass);
					obj['abcclass'] = this.utilService.decode64(row.abcclass);
					obj['custgrp'] = this.utilService.decode64(row.custgrp);
					obj['custstatus'] = this.utilService.decode64(row.custstatus);
					obj['custtype'] = this.utilService.decode64(row.custtype);
					obj['latitude'] = this.utilService.decode64(row.latitude);
					obj['longitude'] = this.utilService.decode64(row.longitude);
					obj['parentgroup'] = this.utilService.decode64(row.parentgroup);
					obj['channeltype1'] = this.utilService.decode64(row.channeltype1);
					obj['channeltype2'] = this.utilService.decode64(row.channeltype2);
					obj['territory'] = this.utilService.decode64(row.territory);
					obj['outletname'] = this.utilService.decode64(row.outletname);
					obj['website'] = this.utilService.decode64(row.website);
					obj['zterm'] = this.utilService.decode64(row.zterm);
					obj['cflag'] = this.utilService.decode64(row.cflag);
					obj['billto'] = this.utilService.decode64(row.billto);
					this.items.push(obj);
				}
				this.groupedObjects = this.utilService.groupObjects(this.items,'name1');
			}
		}, (err) => {
			console.log(JSON.stringify(err));
		});
    }
	goToDetails(obj) {
		this.navCtrl.push('CustomerDetailsPage',{selectedCustomer: obj});
	}
}
