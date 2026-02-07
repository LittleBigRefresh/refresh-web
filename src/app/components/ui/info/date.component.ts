import {
    ChangeDetectorRef,
    Component,
    inject,
    Inject,
    Input,
    NgZone,
    OnDestroy,
    OnInit,
    PLATFORM_ID
} from '@angular/core';
import {TooltipComponent} from "../text/tooltip.component";
import {isPlatformBrowser} from "@angular/common";
import { getFormattedDateTime, getShortDateTime } from '../../../helpers/date-time';

@Component({
    selector: 'app-date',
    imports: [
        TooltipComponent
    ],
    template: `
        <app-tooltip [text]="formattedDate">{{ moment }}</app-tooltip>
    `
})
export class DateComponent implements OnInit, OnDestroy {
    private _date: Date = new Date();
    private intervalId: any;

    constructor(@Inject(PLATFORM_ID) private platformId: string, private changeDetector: ChangeDetectorRef, private zone: NgZone)
    {}

    ngOnInit(): void {
        if (!this.ticking || !this.isBrowser) return;
        this.zone.runOutsideAngular(() => {
            this.intervalId = setInterval(() => {
                // console.log("tick", this.intervalId)
                this.changeDetector.detectChanges();
            }, 1000);
        })
    }

    @Input() ticking: boolean = false;

    get isBrowser(): boolean {
        return isPlatformBrowser(this.platformId);
    }

    // this setter is actually required to be here; this is not a hold-over from the old site
    // for some reason, javascript's date parser doesn't create a full Date object.
    // so we need to do this horse-shit.
    @Input({required: true, alias: "date"})
    set date(value: Date) {
        this._date = new Date(value);
    }

    get moment(): string {
        return getShortDateTime(this._date);
    }

    get formattedDate(): string {
        return getFormattedDateTime(this._date);
    }

    ngOnDestroy() {
        if (this.intervalId) {
            // console.log("unsubscribe", this.intervalId)
            clearInterval(this.intervalId);
            this.intervalId = null;
        }
    }
}
