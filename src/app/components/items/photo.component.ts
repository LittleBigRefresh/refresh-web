import {Component, Input, isDevMode, OnInit} from '@angular/core';
import {Photo} from "../../api/types/photos/photo";
import {NgClass, NgForOf, NgIf, NgOptimizedImage} from "@angular/common";
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
import {PhotoSubject} from "../../api/types/photos/photo-subject";
import {RouterLink} from "@angular/router";

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
    ButtonGroupComponent,
    NgForOf,
    RouterLink,
    NgClass
  ],
  template: `
    <div class="overflow-hidden whitespace-nowrap" [ngClass]="padding ? 'p-1.5' : 'pb-1.5'">
      <app-user-wrapper [user]="photo.publisher">
        <div class="text-gentle text-sm">
          Posted
          <app-date [date]="photo.publishedAt"></app-date>

          <span *ngIf="photo.level">in</span>
          <app-level-link *ngIf="photo.level" [level]="photo.level"></app-level-link>
        </div>
      </app-user-wrapper>
    </div>

    <!--  640x360 is the size of the typical LBP2 photo  -->
    <a [routerLink]="link ? '/photo/' + photo.photoId : null">
      <img [ngSrc]="photo.largeHash" width="640" height="360" alt="" class="w-full h-auto">
    </a>
    
    <div class="text-sm flex" [ngClass]="padding ? 'p-2.5' : 'pt-2.5'">
      <div *ngIf="subjectsWithoutAuthor.length > 0" class="flex grow overflow-hidden whitespace-nowrap overflow-ellipsis">
        <span>with</span>
        <div *ngFor="let subject of subjectsWithoutAuthor; let last = last">
          <app-user-link [user]="subject.user ?? null" [username]="subject.displayName"></app-user-link>
          <span *ngIf="!last">, </span>
        </div>
      </div>

      <div class="text-gentle italic whitespace-nowrap">
        <span>Taken</span>
        <app-date [date]="photo.takenAt"></app-date>
      </div>
    </div>

    <div class="flex" *ngIf="interactionsSupported && isDevMode()" [ngClass]="padding ? 'p-2.5' : 'pt-2.5'">
      <app-button-group class="grow">
        <app-button [icon]="faHeart" text="Heart" color="bg-heart"></app-button>
        <app-button [icon]="faComment" text="Comment"></app-button>
      </app-button-group>
      <div class="self-center">
        <app-statistic [icon]="faHeart" name="Hearts" [value]="7"></app-statistic>
      </div>
    </div>
  `
})
export class PhotoComponent implements OnInit {
  @Input({required:true}) photo: Photo = null!;
  @Input() link: boolean = false;
  @Input() padding: boolean = true;
  subjectsWithoutAuthor: PhotoSubject[] = [];

  ngOnInit(): void {
    this.subjectsWithoutAuthor = this.photo.subjects.filter(s => s.user?.userId != this.photo.publisher.userId)
  }

  protected readonly faHeart = faHeart;
  protected readonly faComment = faComment;

  // set to true to enable heart/comment buttons
  // disabled because this does not exist in refresh
  protected readonly interactionsSupported: boolean = true;
  protected readonly isDevMode = isDevMode;
}