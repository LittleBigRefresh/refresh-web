import { Component } from '@angular/core';

@Component({
    selector: 'app-button-group',
    imports: [],
    template: `
    <div class="flex gap-x-1.5">
      <ng-content></ng-content>
    </div>
  `
})
export class ButtonGroupComponent {

}
