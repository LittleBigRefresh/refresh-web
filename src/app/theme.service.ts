import {Inject, Injectable, PLATFORM_ID} from "@angular/core";
import {isPlatformBrowser} from "@angular/common";

@Injectable({
    providedIn: 'root'
})
export class ThemeService {
    private readonly themeKey: string = "theme";
    private readonly themeWidthKey: string = "theme-width";
    private readonly isBrowser: boolean;

    private useFullPageWidth: boolean = false;

    constructor(@Inject(PLATFORM_ID) platformId: Object) {
        this.isBrowser = isPlatformBrowser(platformId);
        this.useFullPageWidth = this.GetUseFullPageWidth();
    }

    public IsThemingSupported(): boolean {
        return this.isBrowser;
    }

    public SetTheme(theme: string): void {
        localStorage.setItem(this.themeKey, theme);

        // @ts-ignore
        return document.getRootNode().children[0].className = theme;
    }

    public SetUseFullPageWidth(value: boolean): void {
        this.useFullPageWidth = value;
        localStorage.setItem(this.themeWidthKey, String(this.useFullPageWidth));
    }

    public GetUseFullPageWidth(): boolean {
        return JSON.parse(localStorage.getItem(this.themeWidthKey) ?? 'false');
    }

    public GetTheme(): string {
        // @ts-ignore
        return document.getRootNode().children[0].className ?? "default";
    }
}
