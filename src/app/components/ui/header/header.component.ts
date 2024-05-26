import { Component } from '@angular/core';
import {NgOptimizedImage} from "@angular/common";
import {NavbarItemComponent} from "./navbar-item.component";
import {RouterLink} from "@angular/router";
import {faEarth, faFireAlt, faImages, faSearch, faSignIn, faSignInAlt} from "@fortawesome/free-solid-svg-icons";

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [
    NgOptimizedImage,
    NavbarItemComponent,
    RouterLink
  ],
  template: `
    <header class="flex items-center bg-header-background gap-x-2.5 sm:gap-x-1 px-5 py-1 leading-none sticky top-0 left-0 w-full">
      <a routerLink="/" title="Home">
        <img ngSrc="/assets/logo.svg" alt="Refresh Logo" width="48" height="48" priority>
      </a>

      <div class="mx-1.5 w-[3px] rounded-full h-11 bg-divider"></div>
      <nav class="flex gap-x-5 sm:gap-x-2">
        <app-navbar-item href="/levels" title="Levels" [icon]=faEarth></app-navbar-item>
        <app-navbar-item href="/photos" title="Photos" [icon]=faImages></app-navbar-item>
        <app-navbar-item href="/activity" title="Activity" [icon]=faFireAlt></app-navbar-item>
      </nav>
      <div class="grow"></div>
      <nav class="flex gap-x-5 sm:gap-x-2">
        <app-navbar-item href="/search" [icon]=faSearch></app-navbar-item>
        <app-navbar-item href="/login" [icon]=faSignInAlt></app-navbar-item>
      </nav>
    </header>
  `
})
export class HeaderComponent {
  protected readonly faEarth = faEarth;
  protected readonly faImages = faImages;
  protected readonly faFireAlt = faFireAlt;
  protected readonly faSearch = faSearch;
  protected readonly faSignInAlt = faSignInAlt;
}
