import {Component, Inject, Input, PLATFORM_ID} from '@angular/core';
import {TooltipComponent} from "./tooltip.component";
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import {isPlatformBrowser, NgIf} from "@angular/common";

dayjs.extend(relativeTime);

// FIXME: this component can't be used from SSR due to hydration problems
// best to just nuke dayJs entirely and write our own function
@Component({
  selector: 'app-date',
  standalone: true,
  imports: [
    TooltipComponent,
    NgIf
  ],
  template: `
    <app-tooltip [text]="getFormattedDate()" *ngIf="isBrowserOnly">
      {{ getMoment() }}
    </app-tooltip>
    <span *ngIf="!isBrowserOnly">...</span>
  `
})
export class DateComponent {
  private _date: Date = new Date();

  constructor(@Inject(PLATFORM_ID) private platformId: string) {}

  get isBrowserOnly(): boolean {
    return isPlatformBrowser(this.platformId);
  }

  @Input({required: true, alias: "date"})
  set date(value: Date) {
    this._date = new Date(value);
  }

  getMoment(): string {
    return dayjs(this._date).fromNow();
  }

  getFormattedDate(): string {
    return `${this._date.toLocaleDateString()} @ ${this._date.toLocaleTimeString()}`;
  }
}
