import { NgModule } from '@angular/core';
import { EqualToValidatorDirective  } from './equal-to';
@NgModule({
  declarations: [EqualToValidatorDirective],
  exports: [EqualToValidatorDirective]
})
export class ValidatorDirectiveModule { }
