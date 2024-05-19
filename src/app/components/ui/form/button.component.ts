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
    <button class="rounded px-4 py-1.5" (click)="click.emit()" [ngClass]="'bg-' + color">
      <fa-icon *ngIf="icon" [icon]="icon"></fa-icon>
      {{ text }}
    </button>
  `
})
export class ButtonComponent {
  // metadata
  @Input({required: true}) text: string = "Button";
  @Input() icon: IconProp | undefined;
  @Input() color: string = "secondary";

  // actions
  @Input() routerLink: any[] | string | null | undefined
  @Output() click: EventEmitter<any> = new EventEmitter;
}
