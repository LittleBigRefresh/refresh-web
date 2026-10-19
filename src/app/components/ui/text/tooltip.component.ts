import {Component, Input, ChangeDetectionStrategy} from '@angular/core';

// TODO: implement properly
@Component({
    selector: 'app-tooltip',
    imports: [],
    changeDetection: ChangeDetectionStrategy.Eager,
    template: `
    <div [title]=text class="inline">
      <ng-content></ng-content>
    </div>
  `
})
export class TooltipComponent {
  @Input({required: true}) public text: string = "";
}
