import {Component, Input} from '@angular/core';
import {IconProp} from "@fortawesome/fontawesome-svg-core";
import {faExclamationTriangle} from "@fortawesome/free-solid-svg-icons";
import {TooltipComponent} from "./text/tooltip.component";
import {FaIconComponent} from "@fortawesome/angular-fontawesome";
import {DecimalPipe, NgIf} from "@angular/common";

@Component({
  selector: 'app-statistic',
  standalone: true,
  imports: [
    TooltipComponent,
    FaIconComponent,
    DecimalPipe,
    NgIf
  ],
  template: `
    <app-tooltip [text]="name">
      <fa-icon [icon]="icon" class="mr-1"></fa-icon>
      <ng-container *ngIf="truncate">{{value | number:'1.0-1'}}</ng-container>
      <ng-container *ngIf="!truncate">{{value}}</ng-container>
    </app-tooltip>
  `
})
export class StatisticComponent {
  @Input({required: true}) value: number = 0.0;
  @Input({required: true}) name: string = "Statistic";
  @Input({required: true}) icon: IconProp = faExclamationTriangle;
  @Input() truncate: boolean = false;
}
