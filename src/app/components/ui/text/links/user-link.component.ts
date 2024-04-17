import {Component, Input} from '@angular/core';
import {User} from "../../../../api/types/users/user";
import {NgIf} from "@angular/common";
import {UserAvatarComponent} from "../../photos/user-avatar.component";
import {UserRouterLinkComponent} from "./user-router-link.component";

@Component({
  selector: 'app-user-link',
  standalone: true,
  imports: [
    NgIf,
    UserAvatarComponent,
    UserRouterLinkComponent,
  ],
  template: `
    <span *ngIf=!user>Deleted User</span>
    <app-user-router-link [user]=user *ngIf=user>
        <app-user-avatar class="ml-1" [user]=user></app-user-avatar>
        {{user.username}}
    </app-user-router-link>
  `
})
export class UserLinkComponent {
  @Input({required: true}) public user: User | undefined;
}
