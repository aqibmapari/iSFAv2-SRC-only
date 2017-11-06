import { NgModule } from '@angular/core';
import { CommaFormatPipe } from './comma-format';

@NgModule({
  declarations: [CommaFormatPipe],
  exports: [CommaFormatPipe]
})
export class CommaFormatPipeModule { }
