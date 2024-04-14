import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'plural',
  standalone: true
})
export class PluralPipe implements PipeTransform {
  transform(value: string, count: number): string {
    if (count == 1) return `${count} ${value}`;
    return `${count} ${value}s`;
  }
}
