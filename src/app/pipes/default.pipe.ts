import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'default',
  standalone: true
})
export class DefaultPipe implements PipeTransform {
  transform(value: string | undefined | null, fallback: string): string {
    if (!value) return fallback;
    if (value.length < 1) return fallback;

    return value;
  }
}
