import {animate, group, query, style, transition, trigger} from '@angular/animations';
import {Component, ElementRef, ViewChild} from '@angular/core';
import {
    faBell,
    faBookBookmark,
    faCameraAlt,
    faCertificate,
    faEnvelope,
    faExclamationTriangle,
    faFireAlt,
    faGear,
    faMedal,
    faSignIn,
    faSquarePollVertical,
    faWrench
} from '@fortawesome/free-solid-svg-icons';
import {ApiClient, GetAssetImageLink} from './api/api-client.service';
import {HeaderLink} from './header-link';
import {BannerService} from './banners/banner.service';
import {NgxMasonryOptions} from "ngx-masonry";
import {ExtendedUser} from "./api/types/extended-user";
import {UserRoles} from "./api/types/user-roles";
import {Instance} from "./api/types/instance";
import {EmbedService} from "./services/embed.service";
import {TitleService} from "./services/title.service";
import {AuthService} from "./api/auth.service";
import {ThemeService} from "./theme.service";

const fadeLength: string = "50ms";

export const masonryOptions: NgxMasonryOptions = {
    resize: true,
    animations: {
        show: [
            style({opacity: 0}),
            animate(fadeLength, style({opacity: 1}))
        ]
    },
    horizontalOrder: true,
};

export function GenerateEmptyList(i: number): any[] {
    return new Array(i);
}

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    animations: [
        trigger('routeAnimations', [
            transition('* => *', [
                group([
                    query(':leave', [
                        style({opacity: 1, 'grid-column': 1, 'grid-row': 1}),
                        animate(fadeLength, style({opacity: 0}))
                    ], {optional: true}),
                    query(':enter', [
                        style({opacity: 0, 'grid-column': 1, 'grid-row': 1}),
                        animate(fadeLength, style({opacity: 1}))
                    ], {optional: true}),
                ])
            ])
        ])
    ],
})
export class AppComponent {
    title: string = 'Refresh Website';
    user: ExtendedUser | undefined = undefined;

    instance: Instance | undefined = undefined;

    @ViewChild("login") login!: ElementRef;
    @ViewChild("menu") menu!: ElementRef;
    @ViewChild("notifications") notifications!: ElementRef;

    routerLinks: HeaderLink[] = [
        new HeaderLink("Levels", "/levels", faCertificate),
        new HeaderLink("Photos", "/photos", faCameraAlt),
        new HeaderLink("Activity", "/activity", faFireAlt),
        // new HeaderLink("Ranking", "/ranking", faListUl),
    ];

    rightSideRouterLinks: HeaderLink[] = []
    protected readonly GetAssetImageLink = GetAssetImageLink;
    protected readonly faSignIn = faSignIn;
    protected readonly faExclamationTriangle = faExclamationTriangle;
    protected readonly UserRoles = UserRoles;
    protected readonly faBell = faBell;

    constructor(authService: AuthService, apiClient: ApiClient, public bannerService: BannerService, embedService: EmbedService, titleService: TitleService, public themeService: ThemeService) {
        authService.userWatcher.subscribe((data) => this.handleUserUpdate(data))
        this.handleUserUpdate(undefined)

        apiClient.GetInstanceInformation().subscribe((data) => {
            this.instance = data;
            embedService.embedInstance(data);
        });

        titleService.setTitle("")

        if (themeService.IsThemingSupported()) {
            const theme: string | null = localStorage.getItem("theme");
            if (theme) {
                themeService.SetTheme(theme);
            } else {
                themeService.SetTheme("default");
            }
        }
    }

    getTheme(): string {
        return this.themeService.GetTheme();
    }

    handleUserUpdate(data: ExtendedUser | undefined) {
        this.user = data;
        this.rightSideRouterLinks = [];

        if (data !== undefined) {
            this.login.nativeElement.hidden = true;

            if (data.role >= UserRoles.Admin) {
                this.rightSideRouterLinks.push(new HeaderLink("Admin Panel", "/admin", faWrench))
            }

            this.rightSideRouterLinks.push(new HeaderLink("API Documentation", "/documentation", faBookBookmark))
            this.rightSideRouterLinks.push(new HeaderLink("Server Statistics", "/statistics", faSquarePollVertical))
            this.rightSideRouterLinks.push(new HeaderLink("Contests", "/contests", faMedal))
            this.rightSideRouterLinks.push(new HeaderLink("Notifications", "/notifications", faBell))
            this.rightSideRouterLinks.push(new HeaderLink("Settings", "/settings", faGear))
            this.rightSideRouterLinks.push(new HeaderLink("Contact Us", `mailto:${this.instance?.contactInfo.emailAddress}`, faEnvelope, true))
        }
    }

    toggleLogin(): void {
        this.login.nativeElement.hidden = !this.login.nativeElement.hidden;
    }

    toggleMenu(): void {
        this.menu.nativeElement.hidden = !this.menu.nativeElement.hidden;
        this.notifications.nativeElement.hidden = true;
    }

    toggleNotifications(): void {
        this.menu.nativeElement.hidden = true;
        this.notifications.nativeElement.hidden = !this.notifications.nativeElement.hidden;
    }
}
