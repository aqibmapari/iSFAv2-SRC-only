import { Component } from '@angular/core';
import { IonicPage, Platform, NavParams,ViewController } from 'ionic-angular';

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
  model: {oldpassword?: string, newpassword?: string, confirmpassword?: string} = {};
  submitted = false;
  constructor(
    public platform: Platform,
    public params: NavParams,
    public viewCtrl: ViewController
  ) {

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
