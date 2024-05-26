import {Component, EventEmitter, Input, Output} from '@angular/core';
import {FaIconComponent} from "@fortawesome/angular-fontawesome";
import {IconProp} from "@fortawesome/fontawesome-svg-core";
import {NgClass, NgIf} from "@angular/common";

@Component({
  selector: 'app-button',
  standalone: true,
  imports: [
    FaIconComponent,
    NgIf,
    NgClass
  ],
  template: `
    <button class="rounded px-4 py-1.5 hover:brightness-110 active:brightness-95 transition-[filter] disabled:grayscale" (click)="click.emit()" [ngClass]="color" [type]=type [disabled]="!enabled">
      <fa-icon *ngIf="icon" [icon]="icon" class="mr-1"></fa-icon>
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
  @Output() click: EventEmitter<any> = new EventEmitter;
}
