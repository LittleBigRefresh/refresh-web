import {Component, OnInit} from '@angular/core';
import {ApiClient} from "../../api/api-client";
import {catchError, of} from "rxjs";
import {RefreshNotification} from "../../api/types/refresh-notification";
import {Router} from "@angular/router";

@Component({
  selector: 'app-notification-listing',
  templateUrl: './notification-listing.component.html'
})
export class NotificationListingComponent implements OnInit {
  notifications: RefreshNotification[] | undefined | null = null;

  constructor(private apiClient: ApiClient, private router: Router) {}

  ngOnInit() {
    if(!this.apiClient.user) {
      this.router.navigate(['/login'])
      return;
    }

    this.apiClient.GetNotifications()
      .pipe(catchError(() => {
        return of(undefined);
      }))
      .subscribe((data) => {
        this.notifications = data;
      });
  }

  clearNotification(notificationId: string) {
    if(!this.notifications) return;

    const notificationIndex = this.notifications
      .findIndex(item => item.NotificationId == notificationId);

    if(notificationIndex === -1 || notificationIndex == undefined)
      throw "Notification was somehow not found when trying to remove from list. This should never occur.";

    // Remove from array on client
    this.notifications.splice(notificationIndex, 1);

    // Tell server we cleared the notification
    this.apiClient.ClearNotification(notificationId)
      .subscribe();
  }
}
