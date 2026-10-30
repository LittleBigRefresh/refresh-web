import {Component, Input, ChangeDetectionStrategy} from '@angular/core';
import {NgClass} from "@angular/common";

@Component({
    selector: 'app-label',
    imports: [
        NgClass
    ],
    changeDetection: ChangeDetectionStrategy.Eager,
    template: `
    <div [ngClass]="primary ? 'bg-primary' : 'bg-secondary'" class="py-1.5 px-2 rounded-md text-center text-[12px]">
      <ng-content></ng-content>
    </div>
  `
})
export class LabelComponent {
  @Input() primary: boolean = false;
}
