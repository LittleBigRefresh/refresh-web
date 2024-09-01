import {Component, ContentChildren, ElementRef, QueryList, TemplateRef, ViewChildren} from '@angular/core';
import {NgTemplateOutlet} from "@angular/common";

@Component({
  selector: 'app-two-pane-layout',
  standalone: true,
  imports: [
    NgTemplateOutlet
  ],
  template: `
    <div class="grid grid-cols-2 sm:grid-cols-1 md:grid-cols-1 gap-2.5">
      <ng-content></ng-content>
    </div>
  `
})
export class TwoPaneLayoutComponent {}
