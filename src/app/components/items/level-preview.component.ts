import {Component, Input} from '@angular/core';
import {Level} from "../../api/types/levels/level";
import {UserLinkComponent} from "../ui/links/user-link.component";
import {LevelAvatarComponent} from "../ui/photos/level-avatar.component";
import {LevelStatisticsComponent} from "./level-statistics.component";

@Component({
  selector: 'app-level-preview',
  standalone: true,
  imports: [
    UserLinkComponent,
    LevelAvatarComponent,
    LevelStatisticsComponent
  ],
  template: `
    <div class="flex gap-x-2">
      <app-level-avatar [level]="level" [size]=72></app-level-avatar>
      <div class="leading-tight">
        <p class="font-medium text-lg">{{ level.title }}</p>
        <app-level-statistics [level]="level"></app-level-statistics>
        <span class="text-gentle italic">
        by <app-user-link [user]="level.publisher"></app-user-link>
      </span>
      </div>
    </div>
  `,
  styles: ``
})
export class LevelPreviewComponent {
  @Input({required: true}) level!: Level;
}
