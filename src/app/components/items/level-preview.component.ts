import {Component, Input} from '@angular/core';
import {Level} from "../../api/types/levels/level";
import {UserLinkComponent} from "../ui/text/links/user-link.component";
import {LevelAvatarComponent} from "../ui/photos/level-avatar.component";
import {LevelStatisticsComponent} from "./level-statistics.component";
import {LevelRouterLinkComponent} from "../ui/text/links/level-router-link.component";
import {GamePipe} from "../../pipes/game.pipe";
import {DateComponent} from "../ui/date.component";

@Component({
  selector: 'app-level-preview',
  standalone: true,
  imports: [
    UserLinkComponent,
    LevelAvatarComponent,
    LevelStatisticsComponent,
    LevelRouterLinkComponent,
    GamePipe,
    DateComponent
  ],
  template: `
    <div class="flex gap-x-2.5 leading-none justify-center">
      <app-level-router-link [level]="level" class="min-w-[72px] self-center">
        <app-level-avatar [level]="level" [size]=72 class="align-middle"></app-level-avatar>
      </app-level-router-link>
      <div class="truncate grow">
        <app-level-router-link [level]=level>
          <p class="font-medium text-lg truncate"
             [title]=level.title>{{ level.title }}</p>
        </app-level-router-link>
        
        <app-level-statistics [level]="level" class="text-md"></app-level-statistics>
        
        <div class="text-gentle text-sm mt-0.5">
          <p>
            by <app-user-link [user]="level.publisher"></app-user-link>
            for {{level.gameVersion | game: true}}
          </p>
          <p>
            Published <app-date [date]="level.publishDate"></app-date>
          </p>
        </div>
      </div>
    </div>
  `,
  styles: ``
})
export class LevelPreviewComponent {
  @Input({required: true}) level!: Level;
}
