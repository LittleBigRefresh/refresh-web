import {Component, Input} from '@angular/core';
import {ActivityEvent} from "../../api/types/activity/activity-event";
import * as moment from "dayjs";
import {User} from "../../api/types/user";
import {ActivityPage} from "../../api/types/activity/activity-page";
import {Level} from "../../api/types/level";

@Component({
  selector: 'activity-event',
  templateUrl: './activity-event.component.html'
})
export class ActivityEventComponent {
  _event: ActivityEvent | undefined = undefined;
  _page: ActivityPage | undefined = undefined;
  _contextIsLevel: boolean = false;

  @Input() set event(event: ActivityEvent) {
    this._event = event;
  }

  @Input() set page(page: ActivityPage) {
    this._page = page;
  }

  @Input() set contextIsLevel(contextIsLevel: boolean) {
    this._contextIsLevel = contextIsLevel;
  }

  getMoment(timestamp: number | Date): string {
    return moment(timestamp).fromNow();
  }

  getUserFromEvent(): User {
    if(this._page === undefined) return undefined!;
    if(this._event === undefined) return undefined!;

    for(let user of this._page.users) {
      if(user.userId === this._event.userId) return user;
    }

    return undefined!;
  }

  getOtherUserFromEvent(): User {
    if(this._page === undefined) return undefined!;
    if(this._event === undefined) return undefined!;

    for(let user of this._page.users) {
      if(user.userId === this._event.storedObjectId && this._event.storedDataType == 0) return user;
    }

    return undefined!;
  }

  getLevelFromEvent(): Level {
    if(this._page === undefined) return undefined!;
    if(this._event === undefined) return undefined!;

    for(let level of this._page.levels) {
      if(level.levelId === this._event.storedSequentialId && this._event.storedDataType == 1) return level;
    }

    return undefined!;
  }
}
