import {Component, HostBinding, Input} from '@angular/core';
import {BannerInfo} from "./banner-info.interface";
import {FaIconComponent} from "@fortawesome/angular-fontawesome";

import {BannerService} from "./banner.service";
import {animate, animateChild, query, style, transition, trigger} from "@angular/animations";

@Component({
    selector: 'app-popup-banner',
    imports: [
        FaIconComponent
    ],
    animations: [
        trigger('expand', [
            transition(':leave', [
                query('@*', animateChild(), { optional: true }),
                animate('300ms ease-in-out', style({
                    opacity: 0,
                    height: 0,
                    'padding-top': 0,
                    'padding-bottom': 0,
                    'border-bottom': 0
                })),
            ]),
            transition(':enter', [
                style({ opacity: 0, height: 0, 'padding-top': 0, 'padding-bottom': 0 }),
                animate('500ms ease-in-out', style({
                    opacity: 1,
                    height: '*',
                    'padding-top': '*',
                    'padding-bottom': '*'
                })),
            ]),
        ]),
    ],
    template: `
<!--    defer to give the async animation system a reasonable amount of time to pull down js-->
@defer (on timer(50ms)) {
<div @expand class="mx-auto {{info.color}} p-5 py-3 border-b-2 text-lg overflow-hidden">
  @if (id != -1) {
    <fa-icon class="float-right cursor-pointer transition-colors hover:text-dangerous"
    title="Dismiss" (click)="dismiss()" [icon]="'xmark'"></fa-icon>
  }

  <fa-icon [icon]="info.icon" class="pr-2"></fa-icon>
  <span class="font-bold">{{ info.title }}</span>

  <p class="text-sm">{{ info.text }}</p>
</div>
}
`
})
export class PopupBannerComponent {
  @HostBinding("@expand") parentAnimation = true;

  @Input() id: number = -1;
  @Input({required: true}) info: BannerInfo = null!;

  constructor(private bannerService: BannerService) {}

  dismiss() {
    if(this.id == -1) return;
    this.bannerService.dismiss(this.id);
  }
}
