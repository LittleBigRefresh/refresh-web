import {Component, Input} from '@angular/core';
import {Contest} from "../../api/types/contests/contest";
import {NgOptimizedImage} from "@angular/common";

@Component({
  selector: 'app-contest-banner',
  standalone: true,
  imports: [
    NgOptimizedImage
  ],
  template: `
    <img [ngSrc]="contest.bannerUrl" width="1920" height="450" class="w-full rounded-md" [alt]="contest.contestTitle" [title]="contest.contestTitle">
  `,
})
export class ContestBannerComponent {
  @Input({required: true}) contest: Contest = null!;
}
