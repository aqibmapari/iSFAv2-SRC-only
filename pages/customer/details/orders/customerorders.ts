import { Component } from '@angular/core';
import { NavParams } from 'ionic-angular';

import {UtilService} from '../../../../providers/util.service';
import { SharedService } from "../../../../providers/sharedservice";
import { DatabaseService } from "../../../../providers/database.service";

@Component({
	selector: 'customer-orders',
	templateUrl: 'customerorders.html'
})
export class CustomerOrders {
	selectedCustomer : any;
	custorders : any;
	constructor(private utilService: UtilService,
		private navParams: NavParams,
		private sharedService: SharedService,
		private databaseService: DatabaseService) {
		this.selectedCustomer = navParams.get('selectedCustomer');
		this.custorders = [
			{
				vbeln: '0002458394',
				date: '08.07.2017',
				icon: 'arrow-dropright',
				showDetails: false,
				index: 0,
				orderdetails: [
					{maktx: "MCCAIN BRONZE 9 X 9 2.5 KG", matnr: "202223", invno: "0094518391", invdate: "08.07.2017", invqty: "300.0 UOS"}
				]
			},
			{
				vbeln: '0002451685',
				date: '06.07.2017',
				icon: 'arrow-dropright',
				showDetails: false,
				index: 1,
				orderdetails: [
					{maktx: "MCCAIN BRONZE 9 X 9 2.5 KG", matnr: "202223", invno: "0094518389", invdate: "06.07.2017", invqty: "300.0 UOS"},
					{maktx: "MCCAIN BRONZE 9 X 9 5 KG", matnr: "202224", invno: "0094518388", invdate: "06.07.2017", invqty: "500.0 UOS"}
				]
			},
			{
				vbeln: '0002451684',
				date: '05.07.2017',
				icon: 'arrow-dropright',
				showDetails: false,
				index: 2,
				orderdetails: [
					{maktx: "MCCAIN BRONZE 9 X 9 2.5 KG", matnr: "202223", invno: "0094518383", invdate: "05.07.2017", invqty: "300.0 UOS"},
					{maktx: "MCCAIN BRONZE 9 X 9 5 KG", matnr: "202224", invno: "0094518382", invdate: "05.07.2017", invqty: "100.0 UOS"}
				]
			}
		];
	}
	ngOnInit() {
		var items = [];
		this.custorders = [];
		let pernr = this.sharedService.getPernr();
		let kunnr = this.selectedCustomer.kunnr;
		let selQuery = "select distinct so.vbeln,so.sodate,so.vbelni,"+
		"i.vbelnf, i.vbelni,i.matnr,i.qtyuom,i.invdate,i.maktx from sodetailsmst so "+
		"LEFT OUTER JOIN invdetailsmst i ON i.pernr=so.pernr and i.vbelnf=so.vbeln "+
		"where so.pernr=? and so.kunnr=?"
		this.databaseService.selectComplexQuery(selQuery,[this.utilService.encode64(pernr),this.utilService.encode64(kunnr)],0)
		.then((results) => {
			console.log(JSON.stringify(results));
			// var arr = [];
				if(results['rows'] && results['rows']['length'] !== 0){
					var count = 1;
					for (var i=0; i<results['rows']['length']; i++ ){
						var row = results['rows']['item'](i);
						var order = {
							vbeln: this.utilService.decode64(row.vbeln),
							date: row.sodate,
							icon: 'arrow-dropright',
							showDetails: false,
							index: count
						}
						var invoiceDet = {
							invno: this.utilService.decode64(row.vbelni),
							matnr: (this.utilService.decode64(row.matnr)),
							maktx: this.utilService.decode64(row.maktx),
							invdate: (this.utilService.decode64(row.invdate)),
							invqty: this.utilService.decode64(row.qtyuom)
						}
						let index = this.custorders.map(function(x){return x.vbeln === order.vbeln}).indexOf(true);
						if(index === -1){
							if(invoiceDet.invno != null) order["orderdetails"] = [invoiceDet];
							this.custorders.push(order);
						}
						else{
							this.custorders[index].orderdetails.push(invoiceDet);
						}
					};
				}
				console.log(this.custorders);
			}, (err) => {
				console.log(JSON.stringify(err));
		});
	}
	toggleDetails(data) {
    if (data.showDetails) {
        data.showDetails = false;
        data.icon = 'arrow-dropright';
    } else {
        data.showDetails = true;
        data.icon = 'arrow-dropdown';
        for(var i=0; i < this.custorders.length; i++){
          var otherData = this.custorders[i];
          if(otherData.index != data.index){
            otherData.showDetails = false;
            otherData.icon = 'arrow-dropright';
          }
        }
    }
  }
}
