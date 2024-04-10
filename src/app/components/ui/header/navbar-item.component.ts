import {Component, Input} from '@angular/core';
import {RouterLink} from "@angular/router";

@Component({
  selector: 'app-navbar-item',
  standalone: true,
  imports: [
    RouterLink
  ],
  template: `
    <a [routerLink]=href class="flex items-center gap-x-2 text-xl">
<!--        <FontAwesomeIcon [icon]=icon class="w-5 h-5"></FontAwesomeIcon>-->
        <span>{{title}}</span>
    </a>
  `
})
export class NavbarItemComponent {
  @Input({required: true}) public title: string = "";
  @Input({required: true}) public href: string = "";
  // @Input({required: true}) public icon: IconProp = "";
}
