import {Component, Input} from '@angular/core';
import {RouterLink} from "@angular/router";
import {IconProp} from "@fortawesome/fontawesome-svg-core";
import {faExclamationTriangle} from "@fortawesome/free-solid-svg-icons";
import {FaIconComponent} from "@fortawesome/angular-fontawesome";
import {NgIf} from "@angular/common";

@Component({
  selector: 'app-navbar-item',
  standalone: true,
  imports: [
    RouterLink,
    FaIconComponent,
    NgIf
  ],
  template: `
    <a [routerLink]=href class="flex gap-x-2 text-xl font-normal hover:underline" [title]="title">
        <fa-icon [icon]=icon class="text-[1.15rem]"></fa-icon>
        <span *ngIf="title.length > 0">{{title}}</span>
    </a>
  `
})
export class NavbarItemComponent {
  @Input() public title: string = "";
  @Input({required: true}) public href: string = "";
  @Input({required: true}) public icon: IconProp = faExclamationTriangle;
}
