import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'mapProperty'
})
export class MapPropertyPipe implements PipeTransform {

  transform(value: any, propertyName: string): any {
    return value.map(item => {
      return item[propertyName];
    });
  }

}
