import { Component } from '@angular/core';

@Component({
  selector: 'app-section-title',
  standalone: true,
  imports: [],
  template: `
    <h2 class="text-2xl font-bold">
      <ng-content></ng-content>
    </h2>
  `
})
export class SectionTitleComponent {

}
