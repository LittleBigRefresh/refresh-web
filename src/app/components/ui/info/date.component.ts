import {ChangeDetectorRef, Component, inject, Inject, Input, NgZone, OnDestroy, PLATFORM_ID} from '@angular/core';
import {TooltipComponent} from "../text/tooltip.component";
import {isPlatformBrowser} from "@angular/common";

@Component({
    selector: 'app-date',
    standalone: true,
    imports: [
        TooltipComponent
    ],
    template: `
        <app-tooltip [text]="formattedDate">{{ moment }}</app-tooltip>
    `
})
export class DateComponent implements OnDestroy {
    private _date: Date = new Date();
    private intervalId: any;

    constructor(@Inject(PLATFORM_ID) private platformId: string, private changeDetector: ChangeDetectorRef) {
        if (!this.isBrowser) return;

        inject(NgZone).runOutsideAngular(() => {
            this.intervalId = setInterval(() => {
                // console.log("tick", this.intervalId)
                this.changeDetector.detectChanges();
            }, 1000);
        })
    }

    get isBrowser(): boolean {
        return isPlatformBrowser(this.platformId);
    }

    protected recentText = "just now";

    // this setter is actually required to be here; this is not a hold-over from the old site
    // for some reason, javascript's date parser doesn't create a full Date object.
    // so we need to do this horse-shit.
    @Input({required: true, alias: "date"})
    set date(value: Date) {
        this._date = new Date(value);
    }

    get moment(): string {
        const now = new Date();
        const totalSeconds = Math.floor((now.getTime() - this._date.getTime()) / 1000);

        const intervals: { [key: string]: number } = {
            year: 31536000,
            month: 2592000,
            week: 604800,
            day: 86400,
            hour: 3600,
            minute: 60,
            second: 1,
        };

        if (totalSeconds < 20)
            return this.recentText;

        for (const interval in intervals) {
            const time = Math.floor(totalSeconds / intervals[interval]);
            if (time > 1) {
                return `${time} ${interval}s ago`;
            } else if (time == 1) {
                return `a${interval == "hour" ? 'n' : ''} ${interval} ago`;
            }
        }

        return this.recentText;
    }

    get formattedDate(): string {
        return `${this._date.toLocaleDateString()} @ ${this._date.toLocaleTimeString()}`;
    }

    ngOnDestroy() {
        if (this.intervalId) {
            // console.log("unsubscribe", this.intervalId)
            clearInterval(this.intervalId);
        }
    }
}
