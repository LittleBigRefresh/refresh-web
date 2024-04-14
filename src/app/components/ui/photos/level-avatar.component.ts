import {Component, Input} from '@angular/core';
import {NgIf, NgOptimizedImage} from "@angular/common";
import {Level} from "../../../api/types/levels/level";

@Component({
  selector: 'app-level-avatar',
  standalone: true,
  imports: [
    NgIf,
    NgOptimizedImage
  ],
  template: `
    <img *ngIf="this.level" [ngSrc]=this.level.iconHash [width]=size [height]=size class="inline rounded-full" alt=""
         (error)="err($event.target)">
  `
})
export class LevelAvatarComponent {
  @Input({required: true}) level: Level = undefined!;
  error: boolean = false;

  @Input() size: number = 19;

  err(img: EventTarget | null): void {
    if(this.error) return;
    this.error = true;

    if(!(img instanceof HTMLImageElement)) return;
    img.srcset = "/assets/missingLevel.svg";
  }
}
