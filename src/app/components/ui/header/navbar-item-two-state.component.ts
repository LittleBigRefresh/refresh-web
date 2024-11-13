import {Component, Input} from '@angular/core';
import {IconProp} from "@fortawesome/fontawesome-svg-core";
import {faExclamationTriangle} from "@fortawesome/free-solid-svg-icons";
import { NavbarItemComponent } from "./navbar-item.component";

@Component({
  selector: 'app-navbar-item-two-state',
  standalone: true,
  imports: [
    NavbarItemComponent
],
  template: `
    @if (state) {
      <app-navbar-item [title]="titleAlternative" [icon]="iconAlternative" [labelClass]="labelClass" [iconClass]="iconClass"></app-navbar-item>
    }
    @else {
      <app-navbar-item [title]="title" [icon]="icon" [labelClass]="labelClass" [iconClass]="iconClass"></app-navbar-item>
    }
  `
})
export class NavbarItemTwoStateComponent {
  @Input({required: true}) state: boolean = false;

  @Input() public title: string = "Activate";
  @Input() public titleAlternative: string = "Deactivate";

  @Input() public icon: IconProp | undefined = faExclamationTriangle;
  @Input() public iconAlternative: IconProp | undefined = faExclamationTriangle;

  @Input() public labelClass: string = "text-xl";
  @Input() public iconClass: string = "w-5 text-xl";
}
