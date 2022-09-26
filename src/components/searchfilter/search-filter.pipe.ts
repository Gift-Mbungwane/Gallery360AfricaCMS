import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'searchFilter'
})
export class SearchFilterPipe implements PipeTransform {

  // transform(value: unknown, ...args: unknown[]): unknown {
  //   return null;
  // }

  transform(list: any[], filterText: string): any {
    //return list ? list.filter(item => item.name.search(new RegExp(filterText, 'i')) > -1) : [];
    return list ? list.filter(item => item.name.search(new RegExp(filterText, 'i')) > -1): []
  }

}

@Pipe({
  name: 'dateFilter'
})

export class searchDateFilterPipe implements PipeTransform{

  transform(list: any[], filterText: string): any {
    //return list ? list.filter(item => item.name.search(new RegExp(filterText, 'i')) > -1) : [];
    return list ? list.filter(item => item.date.search(new RegExp(filterText, 'i')) > -1): []
  }
}
