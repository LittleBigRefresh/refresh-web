import {Component, Input} from '@angular/core';
import { NgClass } from "@angular/common";

@Component({
    selector: 'app-container',
    imports: [
        NgClass
    ],
    template: `
    <div class="bg-container-background rounded drop-shadow-md" [ngClass]="padding ? (tight ? 'px-3.5 py-1.5' : 'px-5 py-2.5') : ''">
      <ng-content></ng-content>
    </div>
  `
})
export class ContainerComponent {
  @Input() padding: boolean = true;
  @Input() tight: boolean = false;
}
