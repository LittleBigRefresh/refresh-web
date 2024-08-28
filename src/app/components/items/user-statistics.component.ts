import {Component, Input} from '@angular/core';
import {
  faCertificate,
  faComment,
  faHeart,
  faImages
} from "@fortawesome/free-solid-svg-icons";
import {StatisticComponent} from "../ui/info/statistic.component";
import {UserStatistics} from "../../api/types/users/user-statistics";

@Component({
  selector: 'app-user-statistics',
  standalone: true,
  imports: [
    StatisticComponent
  ],
  template: `
    <div class="flex gap-x-1.5">
      <app-statistic [value]=stats.favourites name="Hearts" [icon]=faHeart></app-statistic>
      <app-statistic [value]=stats.profileComments name="Comments" [icon]=faComment></app-statistic>
      <app-statistic [value]=stats.publishedLevels name="Published Levels" [icon]=faCertificate></app-statistic>
      <app-statistic [value]=stats.photosTaken name="Photos" [icon]=faImages></app-statistic>
    </div>
  `
})
export class UserStatisticsComponent {
  @Input({required: true}) stats: UserStatistics = undefined!;

  protected readonly faHeart = faHeart;
  protected readonly faComment = faComment;
  protected readonly faCertificate = faCertificate;
  protected readonly faImages = faImages;
}
