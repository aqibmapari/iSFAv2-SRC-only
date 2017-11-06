import { Component } from '@angular/core';
import {Platform, NavParams, ViewController, IonicPage } from 'ionic-angular';

@IonicPage()
@Component({
    templateUrl: 'addcontact.html'
})
export class AddContactPage {
    contact: any;

    constructor(
        public platform: Platform,
        public params: NavParams,
        public viewCtrl: ViewController
        // public utilService: UtilService,
        // public databaseService: DatabaseService,
        // public sharedService: SharedService
    ) {
      this.contact = params.get('contact');
    }
    dismiss() {
        this.viewCtrl.dismiss();
    }
}
