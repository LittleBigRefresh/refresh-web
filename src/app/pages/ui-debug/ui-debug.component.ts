import { Component } from '@angular/core';
import { NotificationService } from 'src/app/notifications/notification-service';

@Component({
  selector: 'app-ui-debug',
  templateUrl: './ui-debug.component.html'
})
export class UiDebugComponent {
  constructor(private notificationService: NotificationService) {}

  successNotification(): void {
    this.notificationService.pushSuccess("Nice", "Rocket Launch Good");
  }

  warnNotification(): void {
    this.notificationService.pushWarning("Uh", "You done goofed");
  }

  errorNotification(): void {
    this.notificationService.pushError("BAD", "You screwed up so bad bro");
  }
}
