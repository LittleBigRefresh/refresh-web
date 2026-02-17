import {Component, Input} from '@angular/core';
import {
  faCertificate,
  faComment,
  faHeart,
  faImages
} from "@fortawesome/free-solid-svg-icons";
import {StatisticComponent} from "../ui/info/statistic.component";
import {UserStatistics} from "../../api/types/users/user-statistics";
import { UserRelations } from '../../api/types/users/user-relations';

@Component({
    selector: 'app-user-statistics',
    imports: [
        StatisticComponent
    ],
    template: `
    <div class="flex gap-x-1.5">
      <app-statistic [value]=stats.favourites name="Hearts" [icon]=faHeart [emphasize]="(ownRelations?.isHearted ?? false )"></app-statistic>
      <app-statistic [value]=stats.profileComments name="Comments" [icon]=faComment></app-statistic>
      <app-statistic [value]=stats.publishedLevels name="Published Levels" [icon]=faCertificate></app-statistic>
      <app-statistic [value]=stats.photosTaken name="Photos" [icon]=faImages></app-statistic>
    </div>
  `
})
export class UserStatisticsComponent {
  @Input({required: true}) stats: UserStatistics = undefined!;
  @Input() ownRelations: UserRelations | undefined;

  protected readonly faHeart = faHeart;
  protected readonly faComment = faComment;
  protected readonly faCertificate = faCertificate;
  protected readonly faImages = faImages;
}
