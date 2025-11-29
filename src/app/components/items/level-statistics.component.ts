import {Component, Input} from '@angular/core';
import {Level} from "../../api/types/levels/level";
import {faCircleCheck, faHeart, faPlay, faStar, faThumbsDown, faThumbsUp} from "@fortawesome/free-solid-svg-icons";
import {StatisticComponent} from "../ui/info/statistic.component";
import { DateComponent } from "../ui/info/date.component";
import { FaIconComponent } from "@fortawesome/angular-fontawesome";
import { TooltipComponent } from "../ui/text/tooltip.component";

@Component({
    selector: 'app-level-statistics',
    imports: [
    StatisticComponent,
    DateComponent,
    FaIconComponent,
    TooltipComponent
],
    template: `
    <div class="flex flex-wrap gap-x-1.5">
      <app-statistic [value]=level.yayRatings name="Yays" [icon]=faThumbsUp></app-statistic>
      <app-statistic [value]=level.booRatings name="Boos" [icon]=faThumbsDown></app-statistic>
      <app-statistic [value]=level.hearts name="Hearts" [icon]=faHeart></app-statistic>
      <app-statistic [value]=level.uniquePlays name="Plays" [icon]=faPlay></app-statistic>
      <app-statistic [value]=level.score name="Cool Rating (CR)" [icon]=faStar [truncate]=true></app-statistic>
      @if (level.teamPicked) {
        <div class="flex flex-row gap-x-1">
          <app-tooltip text="Team picked">
            <fa-icon [icon]="faCircleCheck"></fa-icon>
          </app-tooltip>
          
          @if (level.dateTeamPicked != null) {
            <app-date [date]="level.dateTeamPicked"></app-date>
          }
        </div>
      }
    </div>
  `
})
export class LevelStatisticsComponent {
  @Input({required: true}) level: Level = undefined!;
  protected readonly faThumbsUp = faThumbsUp;
  protected readonly faThumbsDown = faThumbsDown;
  protected readonly faHeart = faHeart;
  protected readonly faStar = faStar;
  protected readonly faPlay = faPlay;
  protected readonly faCircleCheck = faCircleCheck;
}
