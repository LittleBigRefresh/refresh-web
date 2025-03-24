import {Component, Input} from '@angular/core';
import {IconProp} from "@fortawesome/fontawesome-svg-core";
import {faExclamationTriangle} from "@fortawesome/free-solid-svg-icons";
import { NavbarItemComponent } from "./navbar-item.component";

@Component({
    selector: 'app-navbar-item-two-state',
    imports: [
        NavbarItemComponent
    ],
    template: `
    @if (state) {
      <app-navbar-item [title]="titleAlt" [icon]="iconAlt" [labelClass]="labelClass" [iconClass]="iconClass"></app-navbar-item>
    }
    @else {
      <app-navbar-item [title]="title" [icon]="icon" [labelClass]="labelClass" [iconClass]="iconClass"></app-navbar-item>
    }
  `
})
export class NavbarItemTwoStateComponent {
  @Input({required: true}) state: boolean = false;

  @Input({required: true}) public title: string = "Activate";
  @Input({required: true}) public titleAlt: string = "Deactivate";

  @Input({required: true}) public icon: IconProp = faExclamationTriangle;
  @Input({required: true}) public iconAlt: IconProp = faExclamationTriangle;

  @Input() public labelClass: string = "text-xl";
  @Input() public iconClass: string = "w-5 text-xl";
}
