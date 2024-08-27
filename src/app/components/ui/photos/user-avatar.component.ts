import {Component, Input} from '@angular/core';
import {User} from "../../../api/types/users/user";
import { NgClass, NgOptimizedImage, NgStyle } from "@angular/common";

@Component({
  selector: 'app-user-avatar',
  standalone: true,
  imports: [
    NgOptimizedImage,
    NgClass,
    NgStyle
],
  template: `
    @if (this.user) {
      <img [ngSrc]=this.user.iconHash [width]=size [height]=size class="inline rounded h-auto aspect-square object-cover" alt=""
        (error)="err($event.target)" [ngStyle]="{'min-height': size + 'px', 'min-width': size + 'px'}">
    }
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
