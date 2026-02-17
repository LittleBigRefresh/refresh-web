import {Component, Input} from '@angular/core';
import {IconProp} from "@fortawesome/fontawesome-svg-core";
import {faExclamationTriangle} from "@fortawesome/free-solid-svg-icons";
import {TooltipComponent} from "../text/tooltip.component";
import {FaIconComponent} from "@fortawesome/angular-fontawesome";
import { DecimalPipe, NgClass } from "@angular/common";

@Component({
    selector: 'app-statistic',
    imports: [
        TooltipComponent,
        FaIconComponent,
        DecimalPipe,
        NgClass
    ],
    template: `
    <app-tooltip [text]="name" class="text-secondary-bright">
      <fa-icon [icon]="icon" class="mr-0.5" [ngClass]="emphasize ? 'text-emphasized-primary' : ''"></fa-icon>
      @if (truncate) {
        <span [ngClass]="emphasize ? 'text-emphasized-primary' : ''">{{value | number:'1.0-1'}}</span>
      }
      @else {
        <span [ngClass]="emphasize ? 'text-emphasized-primary' : ''">{{value}}</span>
      }
    </app-tooltip>
    `
})
export class StatisticComponent {
  @Input({required: true}) value: number = 0.0;
  @Input({required: true}) name: string = "Statistic";
  @Input({required: true}) icon: IconProp = faExclamationTriangle;
  @Input() truncate: boolean = false;
  @Input() emphasize: boolean = false;
}
