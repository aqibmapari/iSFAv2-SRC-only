import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ChangePasswordPage } from './changepassword';
import { ValidatorDirectiveModule } from '../../directives/validators/validators.module';
// import { EqualToValidatorDirective } from '../../directives/validators/equal-to';

@NgModule({
  declarations: [
    ChangePasswordPage,
    // EqualToValidatorDirective
  ],
  imports: [
    ValidatorDirectiveModule,
    IonicPageModule.forChild(ChangePasswordPage),
  ],
})
export class ChangePasswordPageModule {}
