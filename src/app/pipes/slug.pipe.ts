import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'slug',
  standalone: true
})
export class SlugPipe implements PipeTransform {
  transform(value: string): string {
    return value.toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, '');
  }
}
