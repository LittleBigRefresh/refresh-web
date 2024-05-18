import {Component, Input} from '@angular/core';
import {Photo} from "../../api/types/photos/photo";
import {NgOptimizedImage} from "@angular/common";
import {UserLinkComponent} from "../ui/text/links/user-link.component";
import {DateComponent} from "../ui/date.component";

@Component({
  selector: 'app-photo',
  standalone: true,
  imports: [
    NgOptimizedImage,
    UserLinkComponent,
    DateComponent
  ],
  template: `
    <!--  640x360 is the size of the typical LBP2 photo  -->
    <img [ngSrc]="photo.largeHash" width="640" height="360" class="rounded-t">
    <div class="px-2.5 py-1.5">
      <span>Uploaded by</span>
      <app-user-link [user]="photo.publisher" class="font-bold"></app-user-link>
      <app-date [date]="photo.publishedAt"></app-date>
    </div>
  `
})
export class PhotoComponent {
  @Input({required:true}) photo: Photo = null!;
}
