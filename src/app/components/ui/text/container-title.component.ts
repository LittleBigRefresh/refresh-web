import { Component } from '@angular/core';

@Component({
  selector: 'app-container-title',
  standalone: true,
  imports: [],
  template: `
    <h2 class="text-xl font-medium">
      <ng-content></ng-content>
    </h2>
  `
})
export class ContainerTitleComponent {

}
