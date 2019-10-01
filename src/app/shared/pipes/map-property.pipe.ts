import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'mapProperty'
})
export class MapPropertyPipe implements PipeTransform {

  transform(value: any, propertyName: string): any {
    console.log(value);
    
    return value.map(item => {
      return item[propertyName];
    });
  }

}
