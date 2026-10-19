import { Component, ChangeDetectionStrategy } from '@angular/core';

@Component({
    selector: 'app-container-header',
    imports: [],
    template: `
    <div class="bg-header-background outline-header-background outline-[1.25rem] outline mb-10">
      <ng-content></ng-content>
    </div>
  `,
    changeDetection: ChangeDetectionStrategy.Eager,
    styles: ``
})
export class ContainerHeaderComponent {

}
