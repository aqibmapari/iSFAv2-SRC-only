import { Component } from '@angular/core';
import { IonicPage, Platform, NavParams,ViewController, NavController } from 'ionic-angular';

import { SharedService } from "../../providers/sharedservice";
import { APIRequestService } from "../../providers/apirequest.service";
import { DatabaseService } from "../../providers/database.service";
import { UtilService } from "../../providers/util.service";
/**
 * Generated class for the ChangepasswordPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage({name: 'ChangePassword'})
@Component({
  selector: 'page-changepassword',
  templateUrl: 'changepassword.html',
})
export class ChangePasswordPage {
  model: {oldpassword?: string, newpassword?: string, confirmpassword?: string,currentpassword?: string} = {};
  submitted = false;
  submitDisabled = true;
  constructor(
    private nav: NavController,
    private platform: Platform,
    private params: NavParams,
    private viewCtrl: ViewController,
    private sharedService: SharedService,
    private apiRequestService: APIRequestService,
    private databaseService: DatabaseService,
    private utilService: UtilService
  ) {
    this.model.currentpassword = this.sharedService.getPwd();
  }
  onSubmit(form) {
    this.submitted = true;
    console.log((form));
    if (form.valid) {
      let oldpassword = this.model.oldpassword;
      let newpassword = this.model.newpassword;
      let confirmpassword = this.model.confirmpassword;
      this.apiRequestService.presentLoader('Please Wait...');
      let ip = this.sharedService.getIP();
      let pernr = this.sharedService.getPernr();
      let className = this.sharedService.getAPIObj('changepwd');
      let action = "?empid="+pernr+"&oldpassword="+oldpassword+"&newpassword="+newpassword;
      this.apiRequestService.getAPI(ip+className+action).then((data) => {
        if(data['response'][0]['status'] === "success"){
          let params = [this.utilService.encode64(newpassword), this.utilService.encode64(pernr)];
          this.databaseService.updateTableQuery("empdetails","password=?","where pernr=?",params,0)
          .then((results) => {
            console.log(JSON.stringify(results));
            this.apiRequestService.dismissLoader();
            this.apiRequestService.presentToast('Password Updated successfully.');
            this.nav.setRoot('Login');
          }, (err) => {
              console.log(JSON.stringify(err));
          });
        }
        else{
          this.apiRequestService.dismissLoader();
          this.apiRequestService.presentToast('Error while resetting password');
        }
      }, (err) => {
        console.log((err));
        this.apiRequestService.dismissLoader();
        this.apiRequestService.presentToast('Could not connect to server');
    });
    }
  }
  dismiss() {
      this.viewCtrl.dismiss();
  }

}
