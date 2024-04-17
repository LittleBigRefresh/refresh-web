import {Component, Input} from '@angular/core';

// TODO: implement properly
@Component({
  selector: 'app-tooltip',
  standalone: true,
  imports: [],
  template: `
    <div [title]=text class="inline">
      <ng-content></ng-content>
    </div>
  `
})
export class TooltipComponent {
  @Input({required: true}) public text: string = "";
}
