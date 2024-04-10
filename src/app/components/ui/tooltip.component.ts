import {Component, Input} from '@angular/core';

// TODO: implement properly
@Component({
  selector: 'app-tooltip',
  standalone: true,
  imports: [],
  template: `
    <div [title]=text>
      <ng-content></ng-content>
    </div>
  `,
  styles: ``
})
export class TooltipComponent {
  @Input({required: true}) public text: string = "";
}
