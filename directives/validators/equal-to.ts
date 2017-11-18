import { Directive, Input } from '@angular/core';
import {Validator, NG_VALIDATORS, AbstractControl } from '@angular/forms';
@Directive({
  selector: '[equalTo][ngModel],[equalTo][formControlName]',
  providers: [{provide: NG_VALIDATORS, useExisting: EqualToValidatorDirective, multi: true}]
})
export class EqualToValidatorDirective implements Validator {
  @Input() equalTo : string;

  validate(control: AbstractControl): {[key: string]: any} {
    let input = control.value;
    let isValid = this.equalTo === input;
    return !isValid ? { 'equalTo': {isValid} } : null;
  }
}
