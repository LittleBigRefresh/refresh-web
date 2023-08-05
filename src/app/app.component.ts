import { animate, group, query, style, transition, trigger } from '@angular/animations';
import {Component, ElementRef, ViewChild} from '@angular/core';
import {
  faBell,
  faCameraAlt,
  faCertificate, faExclamationTriangle,
  faFireAlt,
  faGear,
  faSignIn,
  faUser, faWrench
} from '@fortawesome/free-solid-svg-icons';
import {ApiClient, GetAssetImageLink} from './api/api-client';
import { User } from './api/types/user';
import { HeaderLink } from './header-link';
import { BannerService } from './banners/banner.service';
import {NgxMasonryOptions} from "ngx-masonry";
import {OwnUser} from "./api/types/own-user";
import {UserRoles} from "./api/types/user-roles";

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
  user: OwnUser | undefined = undefined;

  @ViewChild("login") login!: ElementRef;

  routerLinks: HeaderLink[] = [
    new HeaderLink("Levels", "/levels", faCertificate),
    new HeaderLink("Photos", "/photos", faCameraAlt),
    new HeaderLink("Activity", "/activity", faFireAlt),
    // new HeaderLink("Ranking", "/ranking", faListUl),
  ];

  rightSideRouterLinks: HeaderLink[] = []

  constructor(apiClient: ApiClient, public bannerService: BannerService) {
    apiClient.userWatcher.subscribe((data) => this.handleUserUpdate(data))
    this.handleUserUpdate(undefined)
  }

  handleUserUpdate(data: OwnUser | undefined) {
    this.user = data;
    this.rightSideRouterLinks = [];

    if (data !== undefined) {
      this.login.nativeElement.hidden = true;

      if(data.role >= UserRoles.Admin) {
        this.rightSideRouterLinks.push(new HeaderLink("", "/admin", faWrench))
      }

      this.rightSideRouterLinks.push(new HeaderLink("", "/notifications", faBell))
      this.rightSideRouterLinks.push(new HeaderLink("", "/settings", faGear))
    }
  }

  toggleLogin(): void {
    this.login.nativeElement.hidden = !this.login.nativeElement.hidden;
  }

  protected readonly GetAssetImageLink = GetAssetImageLink;
  protected readonly faSignIn = faSignIn;
  protected readonly faExclamationTriangle = faExclamationTriangle;
  protected readonly UserRoles = UserRoles;
  protected readonly undefined = undefined;
}
