import { animate, group, query, style, transition, trigger } from '@angular/animations';
import {Component, ElementRef, ViewChild} from '@angular/core';
import {
  faBars,
  faBell,
  faCameraAlt,
  faCertificate, faExclamationTriangle,
  faFireAlt,
  faGear,
  faSignIn,
  faUser, faWrench
} from '@fortawesome/free-solid-svg-icons';
import {ApiClient, GetAssetImageLink} from './api/api-client.service';
import { User } from './api/types/user';
import { HeaderLink } from './header-link';
import { BannerService } from './banners/banner.service';
import {NgxMasonryOptions} from "ngx-masonry";
import {ExtendedUser} from "./api/types/extended-user";
import {UserRoles} from "./api/types/user-roles";
import {Instance} from "./api/types/instance";
import {EmbedService} from "./services/embed.service";
import {TitleService} from "./services/title.service";
import {AuthService} from "./api/auth.service";

const fadeLength: string = "50ms";

export const masonryOptions: NgxMasonryOptions = {
  resize: true,
  animations: {
    show: [
      style({ opacity: 0 }),
      animate(fadeLength, style({ opacity: 1 }))
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
            style({ opacity: 1, 'grid-column': 1, 'grid-row': 1 }),
            animate(fadeLength, style({ opacity: 0 }))
          ], { optional: true }),
          query(':enter', [
            style({ opacity: 0, 'grid-column': 1, 'grid-row': 1 }),
            animate(fadeLength, style({ opacity: 1 }))
          ], { optional: true }),
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

  routerLinks: HeaderLink[] = [
    new HeaderLink("Levels", "/levels", faCertificate),
    new HeaderLink("Photos", "/photos", faCameraAlt),
    new HeaderLink("Activity", "/activity", faFireAlt),
    // new HeaderLink("Ranking", "/ranking", faListUl),
  ];

  rightSideRouterLinks: HeaderLink[] = []

  constructor(authService: AuthService, apiClient: ApiClient, public bannerService: BannerService, embedService: EmbedService, titleService: TitleService) {
    authService.userWatcher.subscribe((data) => this.handleUserUpdate(data))
    this.handleUserUpdate(undefined)

    apiClient.GetInstanceInformation().subscribe((data) => {
      this.instance = data;
      embedService.embedInstance(data);
    });

    titleService.setTitle("")
  }

  handleUserUpdate(data: ExtendedUser | undefined) {
    this.user = data;
    this.rightSideRouterLinks = [];

    if (data !== undefined) {
      this.login.nativeElement.hidden = true;

      if(data.role >= UserRoles.Admin) {
        this.rightSideRouterLinks.push(new HeaderLink("Admin Panel", "/admin", faWrench))
      }

      this.rightSideRouterLinks.push(new HeaderLink("Notifications", "/notifications", faBell))
      this.rightSideRouterLinks.push(new HeaderLink("Settings", "/settings", faGear))
    }
  }

  toggleLogin(): void {
    this.login.nativeElement.hidden = !this.login.nativeElement.hidden;
  }

  toggleMenu(): void {
    this.menu.nativeElement.hidden = !this.menu.nativeElement.hidden;
  }

  protected readonly GetAssetImageLink = GetAssetImageLink;
  protected readonly faSignIn = faSignIn;
  protected readonly faExclamationTriangle = faExclamationTriangle;
  protected readonly UserRoles = UserRoles;
}
