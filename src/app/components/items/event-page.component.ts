import {Component, Input} from '@angular/core';
import {ActivityPage} from "../../api/types/activity/activity-page";
import {EventComponent} from "./event.component";
import {NgForOf} from "@angular/common";
import {User} from "../../api/types/users/user";
import {Level} from "../../api/types/levels/level";
import {Score} from "../../api/types/levels/score";

@Component({
  selector: 'app-event-page',
  standalone: true,
  imports: [
    EventComponent,
    NgForOf
  ],
  template: `
    <div class="flex flex-col gap-y-2.5">
      <app-event *ngFor="let event of page?.events" [event]="event" [submittingUser]="user(event.userId)!"
                 [user]="user(event.storedObjectId)"
                 [level]="level(event.storedSequentialId)"
                 [score]="score(event.storedObjectId)">
      </app-event>
    </div>
  `
})
export class EventPageComponent {
  @Input({required: true}) page: ActivityPage = undefined!;

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
}