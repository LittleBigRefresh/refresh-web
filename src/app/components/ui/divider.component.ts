import { Component, Input, ChangeDetectionStrategy } from '@angular/core';

@Component({
    selector: 'app-divider',
    imports: [],
    changeDetection: ChangeDetectionStrategy.Eager,
    template: `
    <div [class]="'my-3 h-[3px] rounded-sm drop-shadow-md ' + color"></div>
  `
})
export class DividerComponent {
  @Input() color: String = "bg-divider";
}
