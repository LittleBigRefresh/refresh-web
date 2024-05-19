import {Component, Input, isDevMode} from '@angular/core';
import {Photo} from "../../api/types/photos/photo";
import {NgIf, NgOptimizedImage} from "@angular/common";
import {UserLinkComponent} from "../ui/text/links/user-link.component";
import {DateComponent} from "../ui/date.component";
import {UserWrapperComponent} from "../ui/text/wrappers/user-wrapper.component";
import {UserRouterLinkComponent} from "../ui/text/links/user-router-link.component";
import {LevelLinkComponent} from "../ui/text/links/level-link.component";
import {FaIconComponent} from "@fortawesome/angular-fontawesome";
import {faComment, faHeart} from "@fortawesome/free-solid-svg-icons";
import {StatisticComponent} from "../ui/statistic.component";
import {ButtonComponent} from "../ui/form/button.component";
import {ButtonGroupComponent} from "../ui/form/button-group.component";

@Component({
  selector: 'app-photo',
  standalone: true,
  imports: [
    NgOptimizedImage,
    UserLinkComponent,
    DateComponent,
    UserWrapperComponent,
    UserRouterLinkComponent,
    NgIf,
    LevelLinkComponent,
    FaIconComponent,
    StatisticComponent,
    ButtonComponent,
    ButtonGroupComponent
  ],
  template: `
    <div class="p-1.5">
      <app-user-wrapper [user]="photo.publisher">
        <div class="text-gentle text-sm">
          <app-date [date]="photo.publishedAt"></app-date>

          <span *ngIf="photo.level">in</span>
          <app-level-link *ngIf="photo.level" [level]="photo.level"></app-level-link>
        </div>
      </app-user-wrapper>
    </div>

    <!--  640x360 is the size of the typical LBP2 photo  -->
    <img [ngSrc]="photo.largeHash" width="640" height="360" class="">

    <div class="p-1.5 flex" *ngIf="interactionsSupported && isDevMode()">
      <app-button-group class="grow">
        <app-button [icon]="faHeart" text="Heart" color="heart"></app-button>
        <app-button [icon]="faComment" text="Comment"></app-button>
      </app-button-group>
      <div class="self-center">
        <app-statistic [icon]="faHeart" name="Hearts" [value]="7"></app-statistic>
      </div>
    </div>
  `
})
export class PhotoComponent {
  @Input({required:true}) photo: Photo = null!;
  protected readonly faHeart = faHeart;
  protected readonly faComment = faComment;

  // set to true to enable heart/comment buttons
  // disabled because this does not exist in refresh
  protected readonly interactionsSupported: boolean = false;
  protected readonly isDevMode = isDevMode;
}
