import {Component, Input} from '@angular/core';
import {RouterLink} from "@angular/router";
import {IconProp} from "@fortawesome/fontawesome-svg-core";
import {faExclamationTriangle} from "@fortawesome/free-solid-svg-icons";
import {FaIconComponent} from "@fortawesome/angular-fontawesome";

@Component({
  selector: 'app-navbar-item',
  standalone: true,
  imports: [
    RouterLink,
    FaIconComponent
  ],
  template: `
    <a [routerLink]=href class="flex items-center gap-x-2 text-xl hover:underline sm:gap-x-0 sm:text-[1.4rem]" [title]="title">
        <fa-icon [icon]=icon class="sm:px-2.5"></fa-icon>
        <span class="sm:text-[0px]">{{title}}</span>
    </a>
  `
})
export class NavbarItemComponent {
  @Input({required: true}) public title: string = "";
  @Input({required: true}) public href: string = "";
  @Input({required: true}) public icon: IconProp = faExclamationTriangle;
}
