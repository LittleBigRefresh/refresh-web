import { Component } from '@angular/core';
import {NgOptimizedImage} from "@angular/common";
import {NavbarItemComponent} from "./navbar-item.component";
import {RouterLink} from "@angular/router";

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
        <img ngSrc="/assets/logo.svg" alt="Refresh Logo" width="48" height="48">
      </a>

      <div class="mx-1.5 w-[3px] rounded-full h-11 bg-divider"></div>
      <nav class="flex gap-x-5">
        <app-navbar-item href="/levels" title="Levels"></app-navbar-item>
        <app-navbar-item href="/photos" title="Photos"></app-navbar-item>
        <app-navbar-item href="/levels" title="Activity"></app-navbar-item>
      </nav>
    </div>
  `
})
export class HeaderComponent {

}
