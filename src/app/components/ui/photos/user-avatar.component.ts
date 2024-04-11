import {Component, Input} from '@angular/core';
import {User} from "../../../api/types/users/user";
import {NgIf, NgOptimizedImage} from "@angular/common";

@Component({
  selector: 'app-user-avatar',
  standalone: true,
  imports: [
    NgOptimizedImage,
    NgIf
  ],
  template: `
    <img *ngIf="this.user" [ngSrc]=this.user.iconHash width=19 height=19 class="inline" alt="{{this.user.username}}'s avatar">
  `,
  styles: ``
})
export class UserAvatarComponent {
  @Input({required: true}) user: User = undefined!;
}
