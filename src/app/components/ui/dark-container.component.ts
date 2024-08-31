import { Component } from '@angular/core';

@Component({
  selector: 'app-dark-container',
  standalone: true,
  imports: [],
  template: `
    <div class="bg-backdrop rounded px-5 py-2.5 drop-shadow-md">
      <ng-content></ng-content>
    </div>
  `,
  styles: ``
})
export class DarkContainerComponent {

}
