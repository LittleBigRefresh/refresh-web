import {Component, Input} from '@angular/core';
import {NgClass, NgIf} from "@angular/common";

@Component({
  selector: 'app-container',
  standalone: true,
  imports: [
    NgIf,
    NgClass
  ],
  template: `
    <div class="bg-container-background rounded" [ngClass]="padding ? 'px-5 py-2.5' : ''">
      <ng-content></ng-content>
    </div>
  `
})
export class ContainerComponent {
  @Input() padding: boolean = true;
}
