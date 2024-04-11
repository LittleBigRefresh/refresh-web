import {Component, Input} from '@angular/core';
import {User} from "../../../api/types/users/user";
import {NgIf} from "@angular/common";
import {UserAvatarComponent} from "../photos/user-avatar.component";

@Component({
  selector: 'app-user-link',
  standalone: true,
  imports: [
    NgIf,
    UserAvatarComponent
  ],
  template: `
    <span *ngIf="!user">Deleted User</span>
    <a href="/u/{{user.userId}}" *ngIf="user">
      <span>
        <app-user-avatar [user]="user"></app-user-avatar>
        {{user.username}}
      </span>
    </a>
  `,
  styles: ``
})
export class UserLinkComponent {
  @Input({required: true}) public user: User | undefined;
}
