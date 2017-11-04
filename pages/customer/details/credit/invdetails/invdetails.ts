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
    templateUrl: 'invdetails.html'
})
export class InvDetailsPage {
    invdetails;

    constructor(
        public platform: Platform,
        public params: NavParams,
        public viewCtrl: ViewController
        // public utilService: UtilService,
        // public databaseService: DatabaseService,
        // public sharedService: SharedService
    ) {
      this.invdetails = params.get('invdetails');
    }
    dismiss() {
        this.viewCtrl.dismiss();
    }
}
