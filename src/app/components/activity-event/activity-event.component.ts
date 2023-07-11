import {Component, Input} from '@angular/core';
import {ActivityEvent} from "../../api/types/activity/activity-event";
import * as moment from "dayjs";
import {User} from "../../api/types/user";

@Component({
  selector: 'activity-event',
  templateUrl: './activity-event.component.html'
})
export class ActivityEventComponent {
  _event: ActivityEvent | undefined = undefined;
  _userPool: User[] | undefined = undefined;

  @Input() set event(event: ActivityEvent) {
    this._event = event;
  }

  @Input() set userPool(userPool: User[]) {
    this._userPool = userPool;
  }

  getMoment(timestamp: number | Date): string {
    return moment(timestamp).fromNow();
  }

  getUserFromEvent(): User {
    if(this._userPool === undefined) return undefined!;
    if(this._event === undefined) return undefined!;

    for(let user of this._userPool) {
      if(user.userId === this._event?.userId) return user;
    }

    return undefined!;
  }
}
