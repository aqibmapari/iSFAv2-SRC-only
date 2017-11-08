import { Component, OnInit } from '@angular/core';

import { NavController } from 'ionic-angular';
import {UtilService} from '../../../providers/util.service';
import {DatabaseService} from '../../../providers/database.service';
import {SharedService} from '../../../providers/sharedservice';
// import { ArticleDetailsHeader } from '../../details/articledetailsheader.component';

@Component({
	selector: 'article-list',
	templateUrl: 'articlelist.html'
})
export class ArticleListPage implements OnInit{
	items = [];
    groupedObjects = [];
	constructor(public navCtrl: NavController,
		private utilService: UtilService,
		public databaseService: DatabaseService,
		public sharedService: SharedService) {
			let pernr = this.sharedService.getPernr();
			this.items = [
				{
					pernr: pernr,
					matnr: "201198",
					maktx: "Lipton Green Tea Bags",
					eancode: "4716659844174",
					businessunit: "BU1",
					proddivision: "FD30 - FOOD A",
					category: "Beverages",
					subcategory: "Tea Bags",
					principal: "Uniliver Arabia",
					brand: "Lipton Tea",
					segment: "Green Tea Bags",
					listprice: "199.00",
					packing: "12X100X1.5GM",
					uom: "BTO, CS, EA, PAL, UOS",
					status: "",
					temp: ""
				},
				{
					pernr: pernr,
					matnr: "203016",
					maktx: "AXE DEO MARINE 160 ML",
					eancode: "4716659844174",
					businessunit: "BU1",
					proddivision: "FD30 - FOOD A",
					category: "Beverages",
					subcategory: "Tea Bags",
					principal: "Uniliver Arabia",
					brand: "Lipton Tea",
					segment: "Green Tea Bags",
					listprice: "199.00",
					packing: "12X100X1.5GM",
					uom: "BTO, CS, EA, PAL, UOS",
					status: "",
					temp: ""
				},
				{
					pernr: pernr,
					matnr: "204875",
					maktx: "KLipton Green Tea Bags",
					eancode: "4716659844174",
					businessunit: "BU1",
					proddivision: "FD30 - FOOD A",
					category: "Beverages",
					subcategory: "Tea Bags",
					principal: "Uniliver Arabia",
					brand: "Lipton Tea",
					segment: "Green Tea Bags",
					listprice: "199.00",
					packing: "12X100X1.5GM",
					uom: "BTO, CS, EA, PAL, UOS",
					status: "",
					temp: ""
				},
				{
					pernr: pernr,
					matnr: "206547",
					maktx: "SLipton Green Tea Bags",
					eancode: "4716659844174",
					businessunit: "BU1",
					proddivision: "FD30 - FOOD A",
					category: "Beverages",
					subcategory: "Tea Bags",
					principal: "Uniliver Arabia",
					brand: "Lipton Tea",
					segment: "Green Tea Bags",
					listprice: "199.00",
					packing: "12X100X1.5GM",
					uom: "BTO, CS, EA, PAL, UOS",
					status: "",
					temp: ""
				}
			];
			this.groupedObjects = this.utilService.groupObjects(this.items,'maktx');
	}
	ngOnInit() {
		this.items = [];
		var pernr = this.sharedService.getPernr();
		this.databaseService.selectTableQuery('materialmst',
		'*',
		'WHERE pernr=? limit 50',[this.utilService.encode64(pernr)],0)
		.then((results) => {
			// console.log(JSON.stringify(results));
			if(results['rows'].length !== 0){
				for(var i=0; i<results['rows'].length; i++){
					var row = results['rows']['item'](i);
					var obj = {};
					obj['pernr'] = pernr;
					obj['matnr'] = this.utilService.decode64(row.matnr);
					obj['maktx'] = this.utilService.decode64(row.maktx);
					obj['eancode'] = this.utilService.decode64(row.eancode);
					obj['businessunit'] = this.utilService.decode64(row.businessunit);
					obj['proddivision'] = this.utilService.decode64(row.proddivision);
					obj['category'] = this.utilService.decode64(row.category);
					obj['subcategory'] = this.utilService.decode64(row.subcategory);
					obj['principal'] = this.utilService.decode64(row.principal);
					obj['brand'] = this.utilService.decode64(row.brand);
					obj['segment'] = this.utilService.decode64(row.segment);
					obj['listprice'] = this.utilService.decode64(row.listprice);
					obj['packing'] = this.utilService.decode64(row.packing);
					obj['uom'] = this.utilService.decode64(row.uom);
					obj['status'] = this.utilService.decode64(row.status);
					obj['temp'] = this.utilService.decode64(row.temp);
					this.items.push(obj);
				}
				this.groupedObjects = this.utilService.groupObjects(this.items,'maktx');
			}
		}, (err) => {
			console.log(JSON.stringify(err));
		});

  }
	goToDetails(obj) {
		this.navCtrl.push('ArticleDetailsPage',{selectedArticle: obj});
	}
}
