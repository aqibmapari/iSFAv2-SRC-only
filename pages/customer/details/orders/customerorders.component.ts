import { Component } from '@angular/core';
import { NavParams } from 'ionic-angular';

import {UtilService} from '../../../../providers/util.service';

@Component({
	selector: 'customer-orders',
	templateUrl: 'customerorders.html'
})
export class CustomerOrders {
	selectedCustomer : any;
	custorders : any;
	constructor(private utilService: UtilService, private navParams: NavParams) {
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
