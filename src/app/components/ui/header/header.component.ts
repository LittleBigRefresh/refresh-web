import { Component } from '@angular/core';
import {AsyncPipe, NgIf, NgOptimizedImage} from "@angular/common";
import {NavbarItemComponent} from "./navbar-item.component";
import {Router, RouterLink} from "@angular/router";
import {faEarth, faFireAlt, faImages, faSearch, faSignIn, faSignInAlt} from "@fortawesome/free-solid-svg-icons";
import {FormComponent} from "../form/form.component";
import {FormControl, FormGroup} from "@angular/forms";
import {TextboxComponent} from "../form/textbox.component";
import {SearchBarComponent} from "../form/search-bar.component";
import {LayoutService} from "../../../services/layout.service";

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
    NgIf,
    AsyncPipe
  ],
  template: `
    <header
        class="flex items-center bg-header-background gap-x-2.5 sm:gap-x-1 px-5 py-1 leading-none sticky top-0 left-0 w-full">
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
        <app-form [form]="searchForm" [compact]="true" (submit)="search()" *ngIf="!(layout.isMobile | async)">
          <app-search-bar [form]="searchForm"></app-search-bar>
        </app-form>
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

  constructor(private router: Router, protected layout: LayoutService) {}

  searchForm = new FormGroup({
    query: new FormControl(),
  });

  search() {
    const query: string = this.searchForm.controls.query.getRawValue();
    this.router.navigate(["/levels/search"], {queryParams: {query: query}})
  }
}
