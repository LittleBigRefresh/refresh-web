import { animate, group, query, style, transition, trigger } from '@angular/animations';
import { Component } from '@angular/core';
import {faBell, faCameraAlt, faCertificate, faGear, faSignIn, faUser} from '@fortawesome/free-solid-svg-icons';
import { ApiClient } from './api/api-client';
import { User } from './api/types/user';
import { HeaderLink } from './header-link';
import { BannerService } from './banners/banner.service';

const fadeLength = "50ms";

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
  title = 'Refresh Website';

  routerLinks: HeaderLink[] = [
    new HeaderLink("Levels", "/levels", faCertificate),
    new HeaderLink("Photos", "/photos", faCameraAlt),
    // new HeaderLink("Activity", "/activity", faFireAlt),
    // new HeaderLink("Ranking", "/ranking", faListUl),
  ];

  rightSideRouterLinks: HeaderLink[] = []

  constructor(apiClient: ApiClient, public bannerService: BannerService) {
    apiClient.userWatcher.subscribe((data) => this.handleUserUpdate(data))
    this.handleUserUpdate(undefined)
  }

  handleUserUpdate(data: User | undefined) {
    this.rightSideRouterLinks = [];

    if (data !== undefined) {
      this.rightSideRouterLinks.push(new HeaderLink("", "/notifications", faBell))
      this.rightSideRouterLinks.push(new HeaderLink("", "/settings", faGear))
      this.rightSideRouterLinks.push(new HeaderLink(data.Username, "/user/" + data.Username, faUser))
    } else {
      this.rightSideRouterLinks.push(new HeaderLink("Sign in", "/login", faSignIn))
    }
  }
}
