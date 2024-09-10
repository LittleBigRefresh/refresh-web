import { Component } from '@angular/core';

@Component({
  selector: 'app-pane-title',
  standalone: true,
  imports: [],
  template: `
    <h2 class="text-2xl font-medium">
      <ng-content></ng-content>
    </h2>
  `
})
export class PaneTitleComponent {

}
