import {Component, Input} from '@angular/core';
import {RouterLink} from "@angular/router";
import {User} from "../../../../api/types/users/user";

@Component({
    selector: 'app-user-router-link',
    imports: [
        RouterLink
    ],
    template: `
    <a routerLink="/user/{{user.username}}" class="hover:underline">
      <ng-content></ng-content>
    </a>
  `
})
export class UserRouterLinkComponent {
  @Input({required: true}) public user: User = undefined!;
}
