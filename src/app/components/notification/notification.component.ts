import { Component, Input } from '@angular/core';
import { IconProp } from '@fortawesome/fontawesome-svg-core';
import { NotificationService } from 'src/app/notifications/notification-service';

@Component({
  selector: 'app-notification',
  templateUrl: './notification.component.html'
})
export class NotificationComponent {
  // Styling
  _color: string = 'indigo'
  _icon: IconProp = 'poo'

  @Input()
  set color(param: string) {
    this._color = param;
  }

  @Input()
  set icon(param: IconProp) {
    this._icon = param;
  }

  // Text
  _title: string = "NO TITLE, FIX ME"
  _text: string = "NO TEXT, FIX ME"

  @Input()
  set title(param: string) {
    this._title = param;
  }

  @Input()
  set text(param: string) {
    this._text = param;
  }

  // Logic
  _id: number = -1

  @Input()
  set id(param: number) {
    this._id = param;
  }

  constructor(private notificationService: NotificationService) {}

  dismiss(): void {
    if(this._id == -1) throw Error("Can't dismiss a notification with no ID");

    this.notificationService.dismiss(this._id);
  }
}
