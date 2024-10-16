import {Component, Input} from '@angular/core';
import {DateComponent} from "../ui/info/date.component";
import {UserLinkComponent} from "../ui/text/links/user-link.component";
import {ActivityEvent} from "../../api/types/activity/activity-event";
import {User} from "../../api/types/users/user";
import {EventType} from "../../api/types/activity/event-type";
import {FaIconComponent} from "@fortawesome/angular-fontawesome";
import {
  faCertificate,
  faCircleArrowUp, faComment, faCommentSlash,
  faHeart,
  faHeartBroken, faImages, faList, faListAlt,
  faPlay,
  faPlayCircle, faPlusCircle, faTag,
  faUpDown
} from "@fortawesome/free-solid-svg-icons";

@Component({
  selector: 'app-compact-event',
  standalone: true,
  imports: [
    DateComponent,
    UserLinkComponent,
    FaIconComponent
  ],
  template: `
    <app-user-link [user]="submittingUser" class="font-bold"></app-user-link>
    <span class="ml-1">
    @switch (event.eventType) {
      @case (EventType.Level_Upload) {
        <fa-icon [icon]="faCircleArrowUp"></fa-icon>
        uploaded this level
      }
      @case (EventType.Level_Favourite) {
        <fa-icon [icon]="faHeart"></fa-icon>
        hearted this level
      }
      @case (EventType.Level_Unfavourite) {
        <fa-icon [icon]="faHeartBroken"></fa-icon>
        unhearted this level
      }
      @case (EventType.Level_Play) {
        <fa-icon [icon]="faPlayCircle"></fa-icon>
        played this level
      }
      @case (EventType.Level_Rate) {
        <fa-icon [icon]="faUpDown"></fa-icon>
        rated this level
      }
      @case (EventType.Level_Tag) {
        <fa-icon [icon]="faTag"></fa-icon>
        tagged this level
      }
      @case (EventType.PostLevelComment) {
        <fa-icon [icon]="faComment"></fa-icon>
        posted a comment on this level
      }
      @case (EventType.DeleteLevelComment) {
        <fa-icon [icon]="faCommentSlash"></fa-icon>
        deleted their comment on this level
      }
      @case (EventType.Photo_Upload) {
        <fa-icon [icon]="faImages"></fa-icon>
        uploaded a photo on this level
      }
      @case (EventType.Level_TeamPick) {
        <fa-icon [icon]="faCertificate"></fa-icon>
        team picked this level
      }
      @case (EventType.Level_Rate) {
        <fa-icon [icon]="faUpDown"></fa-icon>
        rated this level
      }
      @case (EventType.Level_Review) {
        <fa-icon [icon]="faComment"></fa-icon>
        reviewed this level
      }
      @case (EventType.Playlist_AddLevel) {
        <fa-icon [icon]="faPlusCircle"></fa-icon>
        added this level to a playlist
      }
      @case (EventType.SubmittedScore_Create) {
        <fa-icon [icon]="faListAlt"></fa-icon>
        set a score on this level
      }
    }
    </span>

    <span class="text-gentle italic">
        <app-date [date]="event.occurredAt" [ticking]="true"></app-date>
    </span>
  `
})
export class CompactEventComponent {
  @Input({required: true}) event: ActivityEvent = null!;
  @Input({required: true}) submittingUser: User = null!;

  protected readonly EventType = EventType;
  protected readonly faCircleArrowUp = faCircleArrowUp;
  protected readonly faHeart = faHeart;
  protected readonly faHeartBroken = faHeartBroken;
  protected readonly faPlayCircle = faPlayCircle;
  protected readonly faUpDown = faUpDown;
  protected readonly faTag = faTag;
  protected readonly faComment = faComment;
  protected readonly faCommentSlash = faCommentSlash;
  protected readonly faImages = faImages;
  protected readonly faCertificate = faCertificate;
  protected readonly faPlusCircle = faPlusCircle;
  protected readonly faListAlt = faListAlt;
}
