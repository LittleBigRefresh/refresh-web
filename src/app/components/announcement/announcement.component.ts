import {Component, Input} from '@angular/core';
import {faBullhorn} from "@fortawesome/free-solid-svg-icons";

@Component({
  selector: 'announcement',
  templateUrl: './announcement.component.html'
})
export class AnnouncementComponent {
  _title: string = "Announcement";
  _body: string = "Loading...";

  @Input()
  set title(str: string) {
    this._title = str;
  }

  @Input()
  set body(str: string) {
    this._body = str;
  }

  protected readonly faBullhorn = faBullhorn;
}
