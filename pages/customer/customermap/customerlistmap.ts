import { Component } from '@angular/core';

import { NavController } from 'ionic-angular';
import {UtilService} from '../../../providers/util.service';
import {DatabaseService} from '../../../providers/database.service';
import {SharedService} from '../../../providers/sharedservice';

@Component({
	selector: 'customer-listmap',
	templateUrl: 'customerlistmap.html'
})
export class CustomerListMapPage {
	items = [];
    groupedObjects = [];
	constructor(public navCtrl: NavController,
		private utilService: UtilService,
		public databaseService: DatabaseService,
		public sharedService: SharedService) {

	}
	ngOnInit() {
		// this.items = [];
		// var pernr = this.sharedService.getPernr();
		// this.databaseService.selectTableQuery('materialmst',
		// '*',
		// 'WHERE pernr=?',[this.utilService.encode64(pernr)],0)
		// .then((results) => {
		// 	// console.log(JSON.stringify(results));
		// 	if(results['rows'].length !== 0){
		// 		for(var i=0; i<results['rows'].length; i++){
		// 			var row = results['rows']['item'](i);
		// 			var obj = {};
		// 			obj['pernr'] = pernr;
		// 			obj['matnr'] = this.utilService.decode64(row.matnr);
		// 			obj['maktx'] = this.utilService.decode64(row.maktx);
		// 			obj['eancode'] = this.utilService.decode64(row.eancode);
		// 			obj['businessunit'] = this.utilService.decode64(row.businessunit);
		// 			obj['proddivision'] = this.utilService.decode64(row.proddivision);
		// 			obj['category'] = this.utilService.decode64(row.category);
		// 			obj['subcategory'] = this.utilService.decode64(row.subcategory);
		// 			obj['principal'] = this.utilService.decode64(row.principal);
		// 			obj['brand'] = this.utilService.decode64(row.brand);
		// 			obj['segment'] = this.utilService.decode64(row.segment);
		// 			obj['listprice'] = this.utilService.decode64(row.listprice);
		// 			obj['packing'] = this.utilService.decode64(row.packing);
		// 			obj['uom'] = this.utilService.decode64(row.uom);
		// 			obj['status'] = this.utilService.decode64(row.status);
		// 			obj['temp'] = this.utilService.decode64(row.temp);
		// 			obj['packing'] = this.utilService.decode64(row.packing);
		// 			this.items.push(obj);
		// 		}
		// 		this.groupedObjects = this.utilService.groupObjects(this.items,'maktx');
		// 	}
		// }, (err) => {
		// 	console.log(JSON.stringify(err));
		// });
    }
	// goToDetails(obj) {
	// 	this.navCtrl.push(ArticleDetailsHeader,{selectedArticle: obj});
	// }
}
