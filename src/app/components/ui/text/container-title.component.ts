import { Component, ChangeDetectionStrategy } from '@angular/core';

@Component({
    selector: 'app-container-title',
    imports: [],
    changeDetection: ChangeDetectionStrategy.Eager,
    template: `
    <h2 class="text-xl font-medium">
      <ng-content></ng-content>
    </h2>
  `
})
export class ContainerTitleComponent {

}
