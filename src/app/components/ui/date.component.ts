import {Component, Input} from '@angular/core';
import {TooltipComponent} from "./text/tooltip.component";

@Component({
  selector: 'app-date',
  standalone: true,
  imports: [
    TooltipComponent
],
  template: `
<!--
    for some stupid fucking reason we need to defer this,
    because otherwise this breaks the layout when SSR renders this component 
-->
    @defer {
      <app-tooltip [text]="getFormattedDate()" class>
        {{ getMoment() }}
      </app-tooltip>
    } @placeholder {
      <span>{{ recentText }}</span>
    }
  `
})
export class DateComponent {
  private _date: Date = new Date();
  
  protected recentText = "just now";

  @Input({required: true, alias: "date"})
  set date(value: Date) {
    this._date = new Date(value);
  }

  getMoment(): string {
    const now = new Date();
    const seconds = Math.floor((now.getTime() - this._date.getTime()) / 1000);

    const intervals: { [key: string]: number } = {
      year: 31536000,
      month: 2592000,
      week: 604800,
      day: 86400,
      hour: 3600,
      minute: 60,
      second: 1,
    };

    for (const interval in intervals) {
      const time = Math.floor(seconds / intervals[interval]);
      if (time >= 1) {
        return `${time} ${interval}${time > 1 ? 's' : ''} ago`;
      }
    }

    return this.recentText;
  }

  getFormattedDate(): string {
    return `${this._date.toLocaleDateString()} @ ${this._date.toLocaleTimeString()}`;
  }
}
