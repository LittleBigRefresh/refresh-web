import { Component } from '@angular/core';

@Component({
    selector: 'app-responsive-grid',
    imports: [],
    template: `
    <div class="grid gap-2.5 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-3">
      <ng-content></ng-content>
    </div>
  `
})
export class ResponsiveGridComponent {

}
