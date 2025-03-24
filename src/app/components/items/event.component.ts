import {Component, Input, OnInit} from '@angular/core';
import {ContainerComponent} from "../ui/container.component";
import {ActivityEvent} from "../../api/types/activity/activity-event";
import {User} from "../../api/types/users/user";
import {UserLinkComponent} from "../ui/text/links/user-link.component";
import {Level} from "../../api/types/levels/level";
import {Score} from "../../api/types/levels/score";
import {EventType} from "../../api/types/activity/event-type";
import {EventDataType} from "../../api/types/activity/event-data-type";
import {LevelPreviewComponent} from "./level-preview.component";
import {DarkContainerComponent} from "../ui/dark-container.component";
import {DateComponent} from "../ui/info/date.component";
import {DecimalPipe} from "@angular/common";
import {PhotoComponent} from "./photo.component";
import {Photo} from "../../api/types/photos/photo";
import {UserPreviewComponent} from "./user-preview.component";

@Component({
    selector: 'app-event',
    imports: [
        ContainerComponent,
        UserLinkComponent,
        LevelPreviewComponent,
        DarkContainerComponent,
        DateComponent,
        DecimalPipe,
        PhotoComponent,
        UserPreviewComponent
    ],
    template: `
    <app-user-link [user]="submittingUser" class="font-bold"></app-user-link>
    @switch (event.eventType) {
      @case (EventType.Level_Upload) {
        uploaded a level
      }
      @case (EventType.Level_Favourite) {
        hearted a level
      }
      @case (EventType.Level_Unfavourite) {
        unhearted a level
      }
      @case (EventType.User_Favourite) {
        hearted someone
      }
      @case (EventType.User_Unfavourite) {
        unhearted someone
      }
      @case (EventType.Level_Play) {
        played a level
      }
      @case (EventType.Level_Rate) {
        rated a level
      }
      @case (EventType.Level_Tag) {
        tagged a level
      }
      @case (EventType.PostLevelComment) {
        posted a comment on a level
      }
      @case (EventType.DeleteLevelComment) {
        deleted their comment on a level
      }
      @case (EventType.Photo_Upload) {
        uploaded a photo
      }
      @case (EventType.Level_Unpublish) {
        deleted a level
      }
      @case (EventType.News_Post) {
        posted a news post
      }
      @case (EventType.Level_TeamPick) {
        team picked a level
      }
      @case (EventType.RateLevelRelation_Create) {
        rated a level
      }
      @case (EventType.Level_Review) {
        reviewed a level
      }
      @case (EventType.PostUserComment) {
        posted a comment on a profile
      }
      @case (EventType.Playlist_Create) {
        created a new playlist
      }
      @case (EventType.Playlist_Favourite) {
        hearted a playlist
      }
      @case (EventType.Playlist_AddLevel) {
        added a level to a playlist
      }
      @case (EventType.SubmittedScore_Create) {
        set a score on a level
      }
      @case (EventType.User_FirstLogin) {
        signed in for the first time
      }
    }

    <span class="text-gentle italic">
        <app-date [date]="event.occurredAt" [ticking]="true"></app-date>
    </span>

    <app-dark-container class="block mt-1.5">
      <div class="flex gap-x-5">
        @switch (event.storedDataType) {
          @case (EventDataType.user) {
            <app-user-preview [user]="user!"></app-user-preview>
          }
          @case (EventDataType.level) {
            <app-level-preview [level]="level!"></app-level-preview>
          }
          @case (EventDataType.score) {
            <app-level-preview [level]="level!" class="grow"></app-level-preview>
            <div class="flex flex-col text-center self-center max-w-fit">
              <p class="font-bold text-xl">
                {{ score?.score | number }}
                points
              </p>
              <p>
                in <b>{{ score?.scoreType }}p</b> mode
              </p>
            </div>
          }
          @case (EventDataType.rateLevelRelation) {
            rateLevelRelation is UNIMPLEMENTED
          }
          @case (EventDataType.photo) {
            <app-photo [photo]="photo!" [link]="true" [padding]="false" [header]="false" class="grow"></app-photo>
          }
        }
      </div>
    </app-dark-container>
  `
})
export class EventComponent implements OnInit {
  @Input({required: true}) event: ActivityEvent = null!;
  @Input({required: true}) submittingUser: User = null!;

  @Input({required: true}) user: User | undefined;
  @Input({required: true}) level: Level | undefined;
  @Input({required: true}) score: Score | undefined;
  @Input({required: true}) photo: Photo | undefined;

  protected readonly EventType = EventType;

  ngOnInit(): void {
    if(!this.level && this.score) {
      this.level = this.score.level;
    }
    else if(!this.level && this.photo) {
      this.level = this.photo.level;
    }
  }

  protected readonly EventDataType = EventDataType;
}
