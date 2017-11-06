import { Pipe, PipeTransform } from '@angular/core';
@Pipe({
  name: 'commaFormat',
})
export class CommaFormatPipe implements PipeTransform {
  transform(value?: number) {
    return this._addCommas(value);
  }
  _addCommas(nStr)
  {
      var flag = 0;
      nStr += '';
      if(nStr.indexOf('-')!= -1){
          flag++;
          nStr = nStr.replace('-','');
      }
      var x = nStr.split('.');
      var x1 = x[0];
      var x2 = x.length > 1 ? '.' + x[1] : '';
      var rgx = /(\d+)(\d{3})/;
      while (rgx.test(x1)) {
          x1 = x1.replace(rgx, '$1' + ',' + '$2');
      }
      if(flag != 0){
          x1 = '-'+x1;
      }
      return x1 + x2;
  }
}
