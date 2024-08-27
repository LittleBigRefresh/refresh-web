import {Component, Input} from '@angular/core';

import {UserAvatarComponent} from "../../photos/user-avatar.component";
import {UserRouterLinkComponent} from "../links/user-router-link.component";
import {User} from "../../../../api/types/users/user";

@Component({
  selector: 'app-user-wrapper',
  standalone: true,
  imports: [
    UserAvatarComponent,
    UserRouterLinkComponent
],
  template: `
    <div class="flex gap-x-1.5">
      <app-user-router-link [user]=user>
        <app-user-avatar class="ml-1" [user]=user [size]=48></app-user-avatar>
      </app-user-router-link>
      
      <div class="flex flex-col">
        <app-user-router-link [user]="user" class="font-bold">{{user.username}}</app-user-router-link>
        <ng-content></ng-content>
      </div>
    </div>
  `
})
export class UserWrapperComponent {
  @Input({required: true}) public user: User = null!;
}
