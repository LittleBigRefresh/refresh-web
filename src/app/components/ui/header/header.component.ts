import { Component } from '@angular/core';

import {NavbarItemComponent} from "./navbar-item.component";
import {Router} from "@angular/router";
import {faSignInAlt} from "@fortawesome/free-solid-svg-icons";



import {LayoutService} from "../../../services/layout.service";
import {NavbarCategoryComponent} from "./navbar-category.component";

import {SearchComponent} from "../../../overlays/search.component";


import {HeaderMeComponent} from "./header-me.component";
import {HeaderLogoComponent} from "./header-logo.component";
import {navTree, rightNavTree} from './navtypes';

@Component({
    selector: 'header-vertical-divider',
    imports: [],
    template: `<div class="mx-1.5 w-[3px] rounded-full h-11 bg-divider"></div>`
})
class VerticalDividerComponent {}

@Component({
    selector: 'app-header',
    imports: [
    NavbarItemComponent,
    NavbarCategoryComponent,
    VerticalDividerComponent,
    SearchComponent,
    HeaderMeComponent,
    HeaderLogoComponent
],
    template: `
    <header
      class="flex items-center bg-header-background gap-x-2.5 sm:gap-x-1 px-5 leading-none sticky top-0 left-0 w-full z-[1000]">
      <app-header-logo></app-header-logo>
    
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
  protected readonly navTree = navTree;
  protected readonly rightNavTree = rightNavTree;

  constructor(private router: Router, protected layout: LayoutService) {}
}
