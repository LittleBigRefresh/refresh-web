import {Component, Input} from '@angular/core';
import {Level} from "../../api/types/levels/level";
import {faCircleCheck, faHeart, faPlay, faStar, faThumbsDown, faThumbsUp} from "@fortawesome/free-solid-svg-icons";
import {StatisticComponent} from "../ui/info/statistic.component";
import { FaIconComponent } from "@fortawesome/angular-fontawesome";
import { TooltipComponent } from "../ui/text/tooltip.component";
import { getFormattedDateTime, getShortDateTime } from '../../helpers/date-time';

@Component({
    selector: 'app-level-statistics',
    imports: [
    StatisticComponent,
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
        <app-tooltip [text]="'Team picked since ' + this.getFormattedDateTime()">
          <div class="flex flex-row gap-x-1">
            <fa-icon [icon]="faCircleCheck"></fa-icon>
            <p> {{this.getShortDateTime()}}</p>
          </div>
        </app-tooltip>
      }
    </div>
  `
})
export class LevelStatisticsComponent {
  @Input({required: true}) level: Level = undefined!;

  ngOnInit() {
    if (this.level.dateTeamPicked != null) {
      this.level.dateTeamPicked = new Date(this.level.dateTeamPicked);
    }
  }

  protected getFormattedDateTime(): string {
    if (this.level.dateTeamPicked == null) return "unknown";

    return getFormattedDateTime(this.level.dateTeamPicked);
  }

  protected getShortDateTime(): string {
    if (this.level.dateTeamPicked == null) return "";

    return getShortDateTime(this.level.dateTeamPicked);
  }

  protected readonly faThumbsUp = faThumbsUp;
  protected readonly faThumbsDown = faThumbsDown;
  protected readonly faHeart = faHeart;
  protected readonly faStar = faStar;
  protected readonly faPlay = faPlay;
  protected readonly faCircleCheck = faCircleCheck;
}
