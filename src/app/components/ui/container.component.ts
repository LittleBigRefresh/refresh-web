import { Component } from '@angular/core';

@Component({
  selector: 'app-container',
  standalone: true,
  imports: [],
  template: `
    <div class="bg-container-background rounded px-5 py-2.5">
      <ng-content></ng-content>
    </div>
  `
})
export class ContainerComponent {

}
