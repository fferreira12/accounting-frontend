import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'pagination'
})
export class PaginationPipe implements PipeTransform {

  transform(value: any, itemsPerPage: any, currentPage: any): any {
    let start = (parseInt(currentPage)-1) * parseInt(itemsPerPage);
    let end = start + parseInt(itemsPerPage);
    //console.log(start);
    //return value.slice(start, end);
    return value.slice(start,end)
  }

}