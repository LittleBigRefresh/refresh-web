import { Component } from '@angular/core';
import {BannerService} from "./banner.service";
import {PopupBannerComponent} from "./popup-banner.component";


@Component({
    selector: 'app-popup-banner-container',
    imports: [
        PopupBannerComponent
    ],
    template: `
    @for (info of bannerService.banners; track info; let i = $index) {
      <app-popup-banner [info]="info" [id]="i"></app-popup-banner>
    }
    `
})
export class PopupBannerContainerComponent {
  constructor(protected bannerService: BannerService) {
  }
}
