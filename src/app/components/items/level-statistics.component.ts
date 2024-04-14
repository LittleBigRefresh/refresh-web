import {Component, Input} from '@angular/core';
import {Level} from "../../api/types/levels/level";
import {faHeart, faStar, faThumbsDown, faThumbsUp} from "@fortawesome/free-solid-svg-icons";
import {StatisticComponent} from "../ui/statistic.component";

@Component({
  selector: 'app-level-statistics',
  standalone: true,
  imports: [
    StatisticComponent
  ],
  template: `
    <div class="flex gap-x-2.5">
      <app-statistic [value]=level.yayRatings name="Yays" [icon]=faThumbsUp></app-statistic>
      <app-statistic [value]=level.booRatings name="Boos" [icon]=faThumbsDown></app-statistic>
      <app-statistic [value]=level.hearts name="Hearts" [icon]=faHeart></app-statistic>
      <app-statistic [value]=level.score name="Cool Rating (CR)" [icon]=faStar [truncate]=true></app-statistic>
    </div>
  `
})
export class LevelStatisticsComponent {
  @Input({required: true}) level: Level = undefined!;
  protected readonly faThumbsUp = faThumbsUp;
  protected readonly faThumbsDown = faThumbsDown;
  protected readonly faHeart = faHeart;
  protected readonly faStar = faStar;
}
