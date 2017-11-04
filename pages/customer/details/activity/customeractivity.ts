import { Component } from '@angular/core';
import { NavParams } from 'ionic-angular';

import {UtilService} from '../../../../providers/util.service';

@Component({
	selector: 'customer-activity',
	templateUrl: 'customeractivity.html'
})
export class CustomerActivity {
	selectedCustomer : any;
	custactivities : any;
	constructor(private utilService: UtilService, private navParams: NavParams) {
		this.selectedCustomer = navParams.get('selectedCustomer');
		this.custactivities = [
			{
				title: 'Monday, 17-Jul-17',
				date: '17.07.2017',
				icon: 'arrow-dropright',
				showDetails: false,
				index: 0,
				orders: [],
				collections: [
					{date: "17.07.2017", time: "11:42:10", invno: "0094491573", amtrcvd: "3,025.6", balance: "0.00", duedate: "29.07.2017"},
					{date: "17.07.2017", time: "11:42:10", invno: "0094491302", amtrcvd: "2,145.0", balance: "0.00", duedate: "31.07.2017"}
				],
				visits: [
					{
						visitdate: "17.07.2017",
						visitstarttime: "10:30 AM",
						visitendtime: "11:00 AM",
						checkindate: "17.07.2017",
						checkintime: "11:42 AM",
						checkoutdate: "17.07.2017",
						checkouttime: "11:43 AM",
						objectives: [{text: "View Customer Details"}, {text: "Payment Follow Up"}, {text: "Order"}],
						orderamt: "0.00",
						collectionamt: "0.00",
						comments: "No order collection done. Need to take appointment before next visit.",
						status: "Done"
					}
				]
			},
			{
				title: 'Thursday, 13-Jul-17',
				date: '13.07.2017',
				icon: 'arrow-dropright',
				showDetails: false,
				index: 1,
				orders: [
					{date: "13.07.2017", time: "11:42:10", no: "1163", reference: "", deliverydate: "14.07.2017", status: "Draft"}
				],
				collections: [],
				visits: []
			},
			{
				title: 'Sunday, 31-May-09',
				date: '31.05.2009',
				icon: 'arrow-dropright',
				showDetails: false,
				index: 2,
				orders: [],
				collections: [],
				visits: [
					{
						visitdate: "31.05.2009",
						visitstarttime: "10:30 AM",
						visitendtime: "11:00 AM",
						checkindate: "",
						checkintime: "",
						checkoutdate: "",
						checkouttime: "",
						objectives: [{text: "View Customer Details"}, {text: "Payment Follow Up"}, {text: "Order"}],
						orderamt: "0.00",
						collectionamt: "0.00",
						comments: "",
						status: "Pending"
					}
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
        for(var i=0; i < this.custactivities.length; i++){
          var otherData = this.custactivities[i];
          if(otherData.index != data.index){
            otherData.showDetails = false;
            otherData.icon = 'arrow-dropright';
          }
        }
    }
  }
}
