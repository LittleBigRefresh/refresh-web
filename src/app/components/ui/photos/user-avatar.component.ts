import {Component, Input} from '@angular/core';
import {User} from "../../../api/types/users/user";
import { NgClass, NgOptimizedImage, NgStyle } from "@angular/common";

@Component({
    selector: 'app-user-avatar',
    imports: [
        NgOptimizedImage,
        NgClass,
        NgStyle
    ],
    template: `
    @if (this.user || this.iconHash) {
      <img [ngSrc]="this.iconHash ?? this.user!.iconHash" [width]=size [height]=size class="inline h-auto aspect-square object-cover" alt=""
        (error)="err($event.target)" loading="lazy"
           [ngStyle]="{'min-height': size + 'px', 'min-width': size + 'px'}"
           [ngClass]="borderRule">
    }
    `
})
export class UserAvatarComponent {
  @Input() user: User | undefined;
  @Input() iconHash: string | undefined;
  error: boolean = false;

  @Input() size: number = 19;
  @Input() borderRule: string = "rounded";

  err(img: EventTarget | null): void {
    if(this.error) return;
    this.error = true;

    if(!(img instanceof HTMLImageElement)) return;
    img.srcset = "/assets/missingUser.svg";
  }
}
