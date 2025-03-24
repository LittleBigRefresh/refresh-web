import {Component, Input} from '@angular/core';
import {UserAvatarComponent} from "../photos/user-avatar.component";
import {AuthenticationService} from "../../../api/authentication.service";
import {AsyncPipe} from "@angular/common";
import {faCaretDown, faSignInAlt} from "@fortawesome/free-solid-svg-icons";
import {NavbarItemComponent} from "./navbar-item.component";
import {UserRouterLinkComponent} from "../text/links/user-router-link.component";
import {FaIconComponent} from "@fortawesome/angular-fontawesome";
import {HeaderMeMenuComponent} from "./header-me-menu.component";

@Component({
    selector: 'app-header-me',
    imports: [
        UserAvatarComponent,
        AsyncPipe,
        NavbarItemComponent,
        UserRouterLinkComponent,
        FaIconComponent,
        HeaderMeMenuComponent
    ],
    template: `
    @if ((auth.user | async); as user) {
      <div class="relative">
        <div (click)="toggleMenu()">
          <app-user-avatar [user]="user" [size]="44"></app-user-avatar>
          @if(arrow) {
            <fa-icon [icon]="faCaretDown" class="ml-2.5"></fa-icon>
          }
        </div>

        @if(showMenu) {
          <app-header-me-menu [user]="user"></app-header-me-menu>
        }
      </div>
    } @else {
      <app-navbar-item href="/login" [icon]=faSignInAlt></app-navbar-item>
    }
  `,
    styles: ``
})
export class HeaderMeComponent {
  protected showMenu: boolean = false;
  @Input() arrow: boolean = false;

  toggleMenu(): void {
    this.showMenu = !this.showMenu;
  }
  
  constructor(protected auth: AuthenticationService) {
  }

  protected readonly faSignInAlt = faSignInAlt;
  protected readonly faCaretDown = faCaretDown;
}
