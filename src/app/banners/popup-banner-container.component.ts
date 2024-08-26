import { Component } from '@angular/core';
import {BannerService} from "./banner.service";
import {PopupBannerComponent} from "./popup-banner.component";
import {NgForOf} from "@angular/common";

@Component({
  selector: 'app-popup-banner-container',
  standalone: true,
  imports: [
    PopupBannerComponent,
    NgForOf
  ],
  template: `
    <ng-container *ngFor="let info of bannerService.banners; let i = index">
      <app-popup-banner [info]="info" [id]="i"></app-popup-banner>
    </ng-container>
  `
})
export class PopupBannerContainerComponent {
  constructor(protected bannerService: BannerService) {
  }
}
