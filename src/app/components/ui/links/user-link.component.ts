import {Component, Input} from '@angular/core';
import {User} from "../../../api/types/users/user";
import {NgIf} from "@angular/common";
import {UserAvatarComponent} from "../photos/user-avatar.component";
import {RouterLink} from "@angular/router";

@Component({
  selector: 'app-user-link',
  standalone: true,
  imports: [
    NgIf,
    UserAvatarComponent,
    RouterLink
  ],
  template: `
    <span *ngIf="!user">Deleted User</span>
    <a routerLink="/user/{{user.username}}" *ngIf="user">
        <app-user-avatar class="ml-1" [user]="user"></app-user-avatar>
        {{user.username}}
    </a>
  `,
  styles: ``
})
export class UserLinkComponent {
  @Input({required: true}) public user: User | undefined;
}
