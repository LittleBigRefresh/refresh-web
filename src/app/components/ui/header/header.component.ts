import { Component } from '@angular/core';
import {NgOptimizedImage} from "@angular/common";
import {NavbarItemComponent} from "./navbar-item.component";
import {RouterLink} from "@angular/router";
import {faCameraAlt, faCertificate, faFireAlt} from "@fortawesome/free-solid-svg-icons";

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [
    NgOptimizedImage,
    NavbarItemComponent,
    RouterLink
  ],
  template: `
    <div class="flex items-center bg-header-background gap-x-2.5 px-5 py-1 leading-none">
      <a routerLink="/" title="Home">
        <img ngSrc="/assets/logo.svg" alt="Refresh Logo" width="48" height="48" priority>
      </a>

      <div class="mx-1.5 w-[3px] rounded-full h-11 bg-divider"></div>
      <nav class="flex gap-x-5">
        <app-navbar-item href="/levels" title="Levels" [icon]=faCertificate></app-navbar-item>
        <app-navbar-item href="/photos" title="Photos" [icon]=faCameraAlt></app-navbar-item>
        <app-navbar-item href="/activity" title="Activity" [icon]=faFireAlt></app-navbar-item>
      </nav>
    </div>
  `
})
export class HeaderComponent {
  protected readonly faCertificate = faCertificate;
  protected readonly faCameraAlt = faCameraAlt;
  protected readonly faFireAlt = faFireAlt;
}
