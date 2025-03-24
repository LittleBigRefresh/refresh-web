import {Component, Input} from '@angular/core';
import {RouterLink} from "@angular/router";

@Component({
    selector: 'app-router-link',
    imports: [
        RouterLink
    ],
    template: `
    <a class="text-link hover:text-link-hover underline transition-colors" [routerLink]="routerLink">
      <ng-content></ng-content>
    </a>
  `
})
export class RouterLinkComponent {
  @Input({required: true}) routerLink: any[] | string | null | undefined
}
