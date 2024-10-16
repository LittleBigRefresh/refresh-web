import {Component, Input} from '@angular/core';
import {ActivityPage} from "../../api/types/activity/activity-page";
import {EventComponent} from "./event.component";

import {User} from "../../api/types/users/user";
import {Level} from "../../api/types/levels/level";
import {Score} from "../../api/types/levels/score";
import {Photo} from "../../api/types/photos/photo";
import {ContainerComponent} from "../ui/container.component";

@Component({
  selector: 'app-event-page',
  standalone: true,
  imports: [
    EventComponent,
    ContainerComponent
  ],
  template: `
    <div class="flex flex-col gap-y-2.5">
      @for (event of page.events; track event.eventId) {
        @if(container) {
          <app-container>
            <app-event [event]="event" [submittingUser]="user(event.userId)!"
                       [user]="user(event.storedObjectId)"
                       [level]="level(event.storedSequentialId)"
                       [score]="score(event.storedObjectId)"
                       [photo]="photo(event.storedSequentialId)">
            </app-event>
          </app-container>
        } @else {
          <app-event [event]="event" [submittingUser]="user(event.userId)!"
                     [user]="user(event.storedObjectId)"
                     [level]="level(event.storedSequentialId)"
                     [score]="score(event.storedObjectId)"
                     [photo]="photo(event.storedSequentialId)">
          </app-event>
        }
      }
    </div>
    `
})
export class EventPageComponent {
  @Input({required: true}) page: ActivityPage = undefined!;
  @Input() container: boolean = true;

  user(id: string | undefined): User | undefined {
    if(!id) return undefined;
    return this.page.users.find(u => u.userId === id);
  }

  level(id: number | undefined): Level | undefined {
    if(!id) return undefined;
    return this.page.levels.find(l => l.levelId === id);
  }

  score(id: string | undefined): Score | undefined {
    if(!id) return undefined;
    return this.page.scores.find(s => s.scoreId === id);
  }

  photo(id: number | undefined): Photo | undefined {
    if(!id) return undefined;
    return this.page.photos.find(l => l.photoId === id);
  }
}
