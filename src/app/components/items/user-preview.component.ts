import {Component, Input} from '@angular/core';
import {User} from "../../api/types/users/user";
import {UserRouterLinkComponent} from "../ui/text/links/user-router-link.component";
import {LevelAvatarComponent} from "../ui/photos/level-avatar.component";
import {UserAvatarComponent} from "../ui/photos/user-avatar.component";
import {DefaultPipe} from "../../pipes/default.pipe";
import {UserStatisticsComponent} from "./user-statistics.component";
import {UserStatusComponent} from "../ui/info/user-status.component";

@Component({
  selector: 'app-user-preview',
  standalone: true,
  imports: [
    UserRouterLinkComponent,
    LevelAvatarComponent,
    UserAvatarComponent,
    DefaultPipe,
    UserStatisticsComponent,
    UserStatusComponent
  ],
  template: `
    <div class="flex gap-x-2.5 leading-none justify-center">
      <app-user-router-link [user]="user">
        <app-user-avatar [user]="user" [size]=72 class="align-middle"></app-user-avatar>
      </app-user-router-link>
      <div class="truncate grow">
        <app-user-router-link [user]="user">
          <p class="font-medium text-lg truncate" [title]=user.username>{{ user.username }}</p>
        </app-user-router-link>

        <app-user-statistics [stats]="user.statistics" class="text-sm"></app-user-statistics>
        <app-user-status [activeRoom]="user.activeRoom" [lastSeen]="user.lastLoginDate" class="block mt-1.5"></app-user-status>
      </div>
    </div>
  `
})
export class UserPreviewComponent {
  @Input({required: true}) user: User = null!;
}
