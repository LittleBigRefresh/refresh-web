import { Component } from '@angular/core';
import { AsyncPipe, NgOptimizedImage } from "@angular/common";
import {NavbarItemComponent} from "./navbar-item.component";
import {Router, RouterLink} from "@angular/router";
import {
  faBookOpen,
  faCheckCircle,
  faEnvelope, faFire,
  faFireAlt,
  faImages,
  faPlay, faQuestionCircle, faRandom, faSearch,
  faShareAlt,
  faSignInAlt, faThList,
  faTools, faTrophy
} from "@fortawesome/free-solid-svg-icons";
import {FormComponent} from "../form/form.component";
import {FormControl, FormGroup} from "@angular/forms";
import {TextboxComponent} from "../form/textbox.component";
import {SearchBarComponent} from "../form/search-bar.component";
import {LayoutService} from "../../../services/layout.service";
import {NavCategory} from "./navtypes";
import {NavbarCategoryComponent} from "./navbar-category.component";
import {FaIconComponent} from "@fortawesome/angular-fontawesome";
import {SearchComponent} from "../../../overlays/search.component";
import {AuthenticationService} from "../../../api/authentication.service";
import {UserLinkComponent} from "../text/links/user-link.component";
import {UserAvatarComponent} from "../photos/user-avatar.component";
import {HeaderMeComponent} from "./header-me.component";

@Component({
  selector: 'header-vertical-divider',
  standalone: true,
  imports: [],
  template: `<div class="mx-1.5 w-[3px] rounded-full h-11 bg-divider"></div>`
})
class VerticalDividerComponent {}

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [
    NgOptimizedImage,
    NavbarItemComponent,
    RouterLink,
    FormComponent,
    TextboxComponent,
    SearchBarComponent,
    AsyncPipe,
    NavbarCategoryComponent,
    FaIconComponent,
    VerticalDividerComponent,
    SearchComponent,
    UserLinkComponent,
    UserAvatarComponent,
    HeaderMeComponent
  ],
  template: `
    <header
      class="flex items-center bg-header-background gap-x-2.5 sm:gap-x-1 px-5 leading-none sticky top-0 left-0 w-full z-[1000]">
      <a routerLink="/" title="Home" class="py-1">
        <img ngSrc="/assets/logo.svg" alt="Refresh Logo" width="48" height="48" priority>
      </a>
    
      <header-vertical-divider></header-vertical-divider>
      <nav class="flex gap-x-5 h-[60px] items-center">
        @for (category of navTree; track category.name) {
          <app-navbar-category [category]="category"></app-navbar-category>
        }
      </nav>
      <div class="grow"></div>
      <nav class="flex gap-x-4 items-center">
        <app-search></app-search>
        @for (category of rightNavTree; track category.name) {
          <app-navbar-category [category]="category" [showNames]="false" [right]="true"></app-navbar-category>
        }
    
        <header-vertical-divider></header-vertical-divider>
        @defer {
          <app-header-me></app-header-me>
        } @placeholder {
          <app-navbar-item href="/login" [icon]=faSignInAlt></app-navbar-item>
        }
      </nav>
    </header>
    `
})
export class HeaderComponent {
  protected readonly faSignInAlt = faSignInAlt;

  protected readonly navTree: NavCategory[] = [
    {
      name: "Play",
      icon: faPlay,
      defaultRoute: "/levels",
      items: [
        {
          name: "Team Picks",
          icon: faCheckCircle,
          route: "/levels/teamPicks"
        },
        {
          name: "Cool Levels",
          icon: faFire,
          route: "/levels/coolLevels"
        },
        {
          name: "Lucky Dip",
          icon: faRandom,
          route: "/levels/random"
        },
      ]
    },
    {
      name: "Create",
      icon: faTools,
      defaultRoute: "/contests",
      items: [
        {
          name: "Contests",
          icon: faTrophy,
          route: "/contests"
        },
        {
          name: "Playlists",
          icon: faThList,
          route: "/playlists"
        }
      ]
    },
    {
      name: "Share",
      icon: faShareAlt,
      defaultRoute: "/activity",
      items: [
        {
          name: "Recent Activity",
          icon: faFireAlt,
          route: "/activity"
        },
        {
          name: "Photos",
          icon: faImages,
          route: "/photos"
        }
      ]
    }
  ]

  protected readonly rightNavTree: NavCategory[] = [
    {
      name: "Other",
      icon: faQuestionCircle,
      defaultRoute: null,
      items: [
        {
          name: "API Documentation",
          icon: faBookOpen,
          route: "/docs"
        },
        {
          name: "Contact Us",
          icon: faEnvelope,
          route: "/contact"
        },
      ]
    }
  ]

  constructor(private router: Router, protected layout: LayoutService) {}
}
