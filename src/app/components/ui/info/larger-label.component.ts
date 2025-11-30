import {Component, Input} from '@angular/core';
import {NgClass} from "@angular/common";

@Component({
    selector: 'app-larger-label',
    imports: [
        NgClass
    ],
    template: `
    <div [ngClass]="primary ? 'bg-primary' : 'bg-secondary'" class="py-1 px-2.5 rounded-md text-center text-[14px]">
      <ng-content></ng-content>
    </div>
  `
})
export class LargerLabelComponent {
  @Input() primary: boolean = false;
}
