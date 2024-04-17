import { Component } from '@angular/core';

@Component({
  selector: 'app-container-header',
  standalone: true,
  imports: [],
  template: `
    <div class="bg-header-background outline-header-background outline-[1.25rem] outline">
      <ng-content></ng-content>
    </div>
  `,
  styles: ``
})
export class ContainerHeaderComponent {

}
