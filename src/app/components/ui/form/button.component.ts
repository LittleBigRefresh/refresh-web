import {Component, Input} from '@angular/core';
import {FaIconComponent} from "@fortawesome/angular-fontawesome";
import {IconProp} from "@fortawesome/fontawesome-svg-core";
import { NgClass } from "@angular/common";

@Component({
  selector: 'app-button',
  standalone: true,
  imports: [
    FaIconComponent,
    NgClass
],
  template: `
    <button class="rounded px-4 py-1.5 hover:brightness-110 active:brightness-95 transition-[filter] disabled:grayscale" 
      [ngClass]="color" [type]=type [disabled]="!enabled">
      @if (icon) {
        <fa-icon [icon]="icon" [ngClass]="text && text.length > 0 ? 'mr-1' : ''"></fa-icon>
      }
      {{ text }}
    </button>
    `
})
export class ButtonComponent {
  // metadata
  @Input({required: true}) text: string = "Button";
  @Input() icon: IconProp | undefined;
  @Input() color: string = "bg-secondary";

  @Input() type: "submit" | "reset" | "button" = "button";

  @Input() enabled: boolean = true;

  // actions
  @Input() routerLink: any[] | string | null | undefined
}
