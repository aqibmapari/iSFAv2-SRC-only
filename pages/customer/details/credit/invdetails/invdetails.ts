import { Component } from '@angular/core';
import {Platform, NavParams, ViewController, IonicPage } from 'ionic-angular';

@IonicPage()
@Component({
    templateUrl: 'invdetails.html'
})
export class InvDetailsPage {
    invdetails: any;

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
