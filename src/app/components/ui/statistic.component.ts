import {Component, Input} from '@angular/core';
import {IconProp} from "@fortawesome/fontawesome-svg-core";
import {faExclamationTriangle} from "@fortawesome/free-solid-svg-icons";
import {TooltipComponent} from "./text/tooltip.component";
import {FaIconComponent} from "@fortawesome/angular-fontawesome";
import { DecimalPipe } from "@angular/common";

@Component({
  selector: 'app-statistic',
  standalone: true,
  imports: [
    TooltipComponent,
    FaIconComponent,
    DecimalPipe
],
  template: `
    <app-tooltip [text]="name">
      <fa-icon [icon]="icon" class="mr-1"></fa-icon>
      @if (truncate) {
        {{value | number:'1.0-1'}}
      }
      @if (!truncate) {
        {{value}}
      }
    </app-tooltip>
    `
})
export class StatisticComponent {
  @Input({required: true}) value: number = 0.0;
  @Input({required: true}) name: string = "Statistic";
  @Input({required: true}) icon: IconProp = faExclamationTriangle;
  @Input() truncate: boolean = false;
}
