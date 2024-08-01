import {Component, Input} from '@angular/core';
import {User} from "../../../api/types/users/user";
import {NgClass, NgIf, NgOptimizedImage, NgStyle} from "@angular/common";

@Component({
  selector: 'app-user-avatar',
  standalone: true,
  imports: [
    NgOptimizedImage,
    NgIf,
    NgClass,
    NgStyle
  ],
  template: `
    <img *ngIf="this.user" [ngSrc]=this.user.iconHash [width]=size [height]=size class="inline rounded" alt=""
         (error)="err($event.target)" [ngStyle]="{'min-height': size + 'px', 'min-width': size + 'px'}">
  `
})
export class UserAvatarComponent {
  @Input({required: true}) user: User = undefined!;
  error: boolean = false;

  @Input() size: number = 19;

  err(img: EventTarget | null): void {
    if(this.error) return;
    this.error = true;

    if(!(img instanceof HTMLImageElement)) return;
    img.srcset = "/assets/missingUser.svg";
  }
}