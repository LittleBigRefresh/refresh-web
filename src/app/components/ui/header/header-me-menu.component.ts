import {Component, Input} from '@angular/core';
import {UserPreviewComponent} from "../../items/user-preview.component";
import {User} from "../../../api/types/users/user";
import {NavbarItemComponent} from "./navbar-item.component";
import {UserAvatarComponent} from "../photos/user-avatar.component";
import {UserRouterLinkComponent} from "../text/links/user-router-link.component";
import {UserStatisticsComponent} from "../../items/user-statistics.component";
import {UserStatusComponent} from "../info/user-status.component";
import {DividerComponent} from "../divider.component";
import {NavItem} from "./navtypes";

@Component({
    selector: 'app-header-me-menu',
    imports: [
        UserPreviewComponent,
        NavbarItemComponent,
        UserAvatarComponent,
        UserRouterLinkComponent,
        UserStatisticsComponent,
        UserStatusComponent,
        DividerComponent
    ],
    template: `
    <div class="absolute z-[1] w-64 px-5 py-2.5 flex flex-col rounded-b bg-header-background gap-y-2 right-0 drop-shadow-md">
      <div class="flex flex-row gap-x-1.5">
        <app-user-router-link [user]="user" class="self-center">
          <app-user-avatar [user]="user" [size]=35 class="align-middle"></app-user-avatar>
        </app-user-router-link>
        <div class="truncate grow">
          <app-user-router-link [user]="user">
            <p class="font-medium text-lg truncate text-" [title]=user.username>{{ user.username }}</p>
          </app-user-router-link>

          <app-user-statistics [stats]="user.statistics" class="text-xs"></app-user-statistics>
        </div>
      </div>

      <app-divider></app-divider>
      @for (item of topItems; track item.route) {
        <app-navbar-item [icon]="item.icon" [title]="item.name" [href]="item.route" iconClass="w-4 text-[1.1rem]" labelClass="text-lg"></app-navbar-item>
      }
      <app-divider></app-divider>
      @for (item of bottomItems; track item.route) {
        <app-navbar-item [icon]="item.icon" [title]="item.name" [href]="item.route" iconClass="w-4 text-[1.1rem]" labelClass="text-lg"></app-navbar-item>
      }
    </div>
  `
})
export class HeaderMeMenuComponent {
  @Input({required: true}) user: User = undefined!;

  protected topItems: NavItem[] = [
    {
      name: 'Game Authentication',
      icon: 'key',
      route: '/settings/auth'
    },
    {
      name: 'Notifications',
      icon: 'bell',
      route: '/notifications'
    },
    {
      name: 'Settings',
      icon: 'cog',
      route: '/settings'
    }
  ];
  protected bottomItems: NavItem[] = [
    {
      name: 'Log out',
      icon: 'sign-out-alt',
      route: '/logout'
    }
  ];
}
