import { Input, Pipe, PipeTransform } from '@angular/core';
import { Segment } from 'src/app/models/segment';

@Pipe({
  name: 'filter',
})
export class FilterPipe implements PipeTransform {
  transform(array: Segment[], text: string): any {
    if (!array) return [];
    if (!text) return array;

    return array.filter((item) => {
      return item.name.toLowerCase().includes(text.toLowerCase());
    });
  }
}
