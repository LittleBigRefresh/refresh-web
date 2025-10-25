import {Component, Input} from '@angular/core';
import {FaIconComponent} from "@fortawesome/angular-fontawesome";
import {IconProp} from "@fortawesome/fontawesome-svg-core";
import { NgClass } from "@angular/common";

@Component({
    selector: 'app-button',
    imports: [
        FaIconComponent,
        NgClass
    ],
    template: `
    <button class="flex flex-row justify-center rounded px-4 py-1.5 hover:brightness-110 active:brightness-95 transition-[filter] disabled:grayscale" 
      [ngClass]="color + ' ' + width" [type]=type [disabled]="!enabled">
      @if (icon) {
        <fa-icon class="right-1" [icon]="icon" [ngClass]="text && text.length > 0 ? 'mr-2' : ''"></fa-icon>
      }
      @if (text) {
        <div class="flex flex-row flex-grow justify-center"> {{ text }} </div>
      }
    </button>
    `
})
export class ButtonComponent {
  // metadata
  @Input() text: string | undefined;
  @Input() icon: IconProp | undefined;
  @Input() color: string = "bg-secondary";

  @Input() type: "submit" | "reset" | "button" = "button";

  @Input() enabled: boolean = true;
  @Input() width: string = "";

  // actions
  @Input() routerLink: any[] | string | null | undefined
}
