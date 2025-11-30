import {Component, Input} from '@angular/core';
import {Level} from "../../api/types/levels/level";
import {UserLinkComponent} from "../ui/text/links/user-link.component";
import {LevelAvatarComponent} from "../ui/photos/level-avatar.component";
import {LevelStatisticsComponent} from "./level-statistics.component";
import {LevelRouterLinkComponent} from "../ui/text/links/level-router-link.component";
import {GamePipe} from "../../pipes/game.pipe";
import {DateComponent} from "../ui/info/date.component";
import {DefaultPipe} from "../../pipes/default.pipe";
import {LabelComponent} from "../ui/info/label.component";
import { OriginalPublisherRouterLink } from "../ui/text/links/original-publisher-router-link.component";
import { TooltipComponent } from "../ui/text/tooltip.component";

@Component({
    selector: 'app-level-preview',
    imports: [
    UserLinkComponent,
    LevelAvatarComponent,
    LevelStatisticsComponent,
    LevelRouterLinkComponent,
    GamePipe,
    DateComponent,
    DefaultPipe,
    LabelComponent,
    OriginalPublisherRouterLink,
    TooltipComponent
],
    template: `
    <div class="flex gap-x-2.5 leading-none justify-center">
      <app-level-router-link [level]="level" class="min-w-[72px] self-center">
        <app-level-avatar [level]="level" [size]=72 class="align-middle"></app-level-avatar>
      </app-level-router-link>
      <div class="truncate grow">
        <app-level-router-link [level]=level>
          <p class="font-medium text-lg truncate"
             [title]=level.title>{{ level.title | default: "Unnamed Level" }}</p>
        </app-level-router-link>
        
        <app-level-statistics [level]="level" [short]="true" class="text-sm"></app-level-statistics>
        
        <div class="text-gentle text-sm mt-0.5 flex flex-wrap gap-x-1">
          @if (level.isReUpload) {
            <p>by <app-original-publisher-router-link [level]="this.level"></app-original-publisher-router-link></p>
            <p>(<app-user-link [user]="level.publisher"></app-user-link>)</p>
          }
          @else {
            <p>by <app-user-link [user]="level.publisher"></app-user-link></p>
          }

          <app-date [date]="level.publishDate"></app-date>
        </div>
        
        <div class="flex gap-x-1 mt-1">
          <app-tooltip [text]="'This level was published in ' + (level.gameVersion | game: false)">
            <app-label [primary]="true">{{level.gameVersion | game: true}}</app-label>
          </app-tooltip>
          
          @if (level.isModded) {
            <app-tooltip text="This level contains modded assets">
              <app-label [primary]="true">Modded</app-label>
            </app-tooltip>
          }
<!--          <app-label>Platformer</app-label>-->
<!--          <app-label>Short</app-label>-->
<!--          <app-label>Insane</app-label>-->
        </div>
      </div>
    </div>
  `,
    styles: ``
})
export class LevelPreviewComponent {
  @Input({required: true}) level!: Level;
}
