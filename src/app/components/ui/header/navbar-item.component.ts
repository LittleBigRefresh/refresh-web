import {Component, Input} from '@angular/core';
import {RouterLink} from "@angular/router";
import {IconProp} from "@fortawesome/fontawesome-svg-core";
import {faExclamationTriangle} from "@fortawesome/free-solid-svg-icons";
import {FaIconComponent} from "@fortawesome/angular-fontawesome";
import { NgClass } from "@angular/common";

@Component({
  selector: 'app-navbar-item',
  standalone: true,
  imports: [
    RouterLink,
    FaIconComponent,
    NgClass
],
  template: `
    <a [routerLink]=href class="flex gap-x-2 font-normal hover:underline" [ngClass]="labelClass" [title]="title">
      <fa-icon [icon]=icon class="text-center" [ngClass]="iconClass"></fa-icon>
      @if (title.length > 0) {
        <span>{{ title }}</span>
      }
    </a>
    `
})
export class NavbarItemComponent {
  @Input() public title: string = "";
  @Input({required: true}) public href: string = "";
  @Input({required: true}) public icon: IconProp = faExclamationTriangle;

  @Input() public labelClass: string = "text-xl";
  @Input() public iconClass: string = "w-5 text-xl";
}
