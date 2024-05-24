import {Inject, Injectable, PLATFORM_ID} from "@angular/core";
import {isPlatformBrowser} from "@angular/common";
import {BehaviorSubject} from "rxjs";

@Injectable({providedIn: 'root'})
export class LayoutService {
    private readonly isBrowser: boolean = false;

    private isMobileValue: boolean = false;
    public readonly isMobile = new BehaviorSubject(false);

    constructor(@Inject(PLATFORM_ID) platformId: Object) {
        if (!isPlatformBrowser(platformId)) return;

        this.isBrowser = true;
        window.addEventListener("resize", () => {
            console.log(this.checkIsMobileLayout());
        });

        this.checkIsMobileLayout()
    }

    private checkIsMobileLayout(): boolean {
        if(!this.isBrowser) {
            return false; // TODO: attempt user-agent based detection to avoid layout shift on mobile
        }

        const check = window.innerWidth < 768/*px*/;
        if(this.isMobileValue != check) {
            this.isMobileValue = check;
            this.isMobile.next(check);
        }

        return check;
    }
}
