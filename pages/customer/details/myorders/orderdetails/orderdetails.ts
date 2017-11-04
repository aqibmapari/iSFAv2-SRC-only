import { Component } from '@angular/core';
import {Platform, NavParams, ViewController } from 'ionic-angular';

// import {UtilService} from '../../app/services/util.service';
// import {DatabaseService} from '../../app/services/database.service';
// import {SharedService} from '../../app/services/sharedservice';
// import {APIRequestService} from '../../app/services/apirequest.service';
// import {AfterLoginAPIService} from '../../app/services/afterloginapi.service';
// import {MasterSyncAPIService} from '../../app/services/mastersyncapi.service';
// import {CustomerSyncAPIService} from '../../app/services/customersyncapi.service';
// import {VisitSyncAPIService} from '../../app/services/visitsyncapi.service';
@Component({
  selector: 'page-orderdetails',
  templateUrl: 'orderdetails.html'
})
export class OrderDetailsPage {
    order;
    data: Array<{title: string, icon: string, showDetails: boolean, index: number}> = [];
    constructor(
        public platform: Platform,
        public params: NavParams,
        public viewCtrl: ViewController
        // public utilService: UtilService,
        // public databaseService: DatabaseService,
        // public sharedService: SharedService
    ) {
      this.order = params.get('order');
      this.data= [
        {
          title: 'Defaults : ',
          icon: 'arrow-dropright',
          showDetails: false,
          index: 0
        },
        {
          title: 'Customer Details',
          icon: 'arrow-dropright',
          showDetails: false,
          index: 1
        },
        {
          title: 'Article Details',
          icon: 'arrow-dropdown',
          showDetails: true,
          index: 2
        }
      ];
      this.order.avlblcredit = "48,029.40";
      this.order.totalamount = "2,221.00";
      this.order.orderdetails = [
        {matnr: "201198", maktx:"AMOXICILIN 500mg TAB", unitprice:"199.00", specialprice: "190.50", qty: "2", uom: "UOS", ordervalue: "381.00", foc: "0", sqty0: "1", sqty1: "1", sqty2: "0", sqty3: "0", sqty4: "0", sqty5: "0"},
        {matnr: "205464", maktx:"ANCHOR UHT EXTRA WHIPPING CREAM 1 LTR", unitprice:"180.00", specialprice: "", qty: "1", uom: "UOS", ordervalue: "180.00", foc: "0", sqty0: "1", sqty1: "0", sqty2: "0", sqty3: "0", sqty4: "0", sqty5: "0"},
        {matnr: "205465", maktx:"ANCHOR UHT EXTRA YIELD COOKING CREAM 1 LTR", unitprice:"165.00", specialprice: "", qty: "4", uom: "UOS", ordervalue: "660.00", foc: "0", sqty0: "10", sqty1: "-6", sqty2: "6", sqty3: "6", sqty4: "6", sqty5: "6"},
        {matnr: "204255", maktx:"CHICKEN BREAST 6 OZ", unitprice:"201.00", specialprice: "200.00", qty: "5", uom: "UOS", ordervalue: "1,000.00", foc: "0", sqty0: "5", sqty1: "0", sqty2: "0", sqty3: "0", sqty4: "0", sqty5: "0"}
      ]

    }

  toggleDetails(data) {
    if (data.showDetails) {
        data.showDetails = false;
        data.icon = 'arrow-dropright';
    } else {
        data.showDetails = true;
        data.icon = 'arrow-dropdown';
        for(var i=0; i < this.data.length; i++){
          var otherData = this.data[i];
          if(otherData.index != data.index){
            otherData.showDetails = false;
            otherData.icon = 'arrow-dropright';
          }
        }
    }
  }
    dismiss() {
        this.viewCtrl.dismiss();
    }
}
