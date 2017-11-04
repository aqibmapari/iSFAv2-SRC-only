import { Component } from '@angular/core';
import { IonicPage, Platform, NavParams,ViewController } from 'ionic-angular';

import { SharedService } from "../../providers/sharedservice";
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
    public platform: Platform,
    public params: NavParams,
    public viewCtrl: ViewController,
    private sharedService: SharedService
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
    }
  }
  dismiss() {
      this.viewCtrl.dismiss();
  }

}
