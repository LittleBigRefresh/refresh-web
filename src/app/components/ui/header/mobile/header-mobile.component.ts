import { Component } from '@angular/core';
import {HeaderLogoComponent} from "../header-logo.component";

import {faBars, faSignInAlt} from "@fortawesome/free-solid-svg-icons";
import {HeaderMeComponent} from "../header-me.component";
import {NavbarItemComponent} from "../navbar-item.component";
import {HeaderNavbarMobileComponent} from "./header-navbar-mobile.component";

@Component({
    selector: 'app-header-mobile',
    imports: [
    HeaderLogoComponent,
    HeaderMeComponent,
    NavbarItemComponent,
    HeaderNavbarMobileComponent
],
    template: `
    <header class="flex items-center bg-header-background gap-x-1 px-5 sticky top-0 left-0 w-full z-[1000] text-xl h-[60px] justify-between">
      <app-header-navbar-mobile></app-header-navbar-mobile>

      <app-header-logo class="absolute left-1/2 -translate-x-1/2"></app-header-logo>

      @defer {
        <app-header-me [arrow]="false" class=""></app-header-me>
      } @placeholder {
        <app-navbar-item href="/login" [icon]=faSignInAlt class=""></app-navbar-item>
      }
    </header>
  `
})
export class HeaderMobileComponent {
  protected readonly faBars = faBars;
  protected readonly faSignInAlt = faSignInAlt;
}
