import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
    name: 'scoreType',
    standalone: true
})
export class ScoreTypePipe implements PipeTransform {
    transform(value: number): string {
        switch (value) {
            case 0:
            case 7:
                return "All player modes";
            case 1:
                return "1-player mode";
            case 2:
                return "2-player mode";
            case 3:
                return "3-player mode";
            case 4:
                return "4-player mode";
            default:
                return "Unknown (" + value + ")";
        }
    }
}