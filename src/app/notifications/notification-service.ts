import { Injectable } from "@angular/core";
import { ApiClient } from "../api/api-client";
import { User } from "../api/types/user";
import { Notification } from "./notification";

@Injectable({providedIn: 'root'})
export class NotificationService {
    notifications: Notification[] = []

    dismiss(id: number): void {
        this.notifications.splice(id, 1);
    }

    // should probably be somewhere else
    constructor(apiClient: ApiClient) {
        apiClient.userWatcher.subscribe((user) => this.userNotification(user))
    }

    userNotification(user: User | undefined): void {
        if(user !== undefined) {
            this.notifications.push({
                Title: `Hi, ${user.Username}!`,
                Icon: 'check-circle',
                Color: 'green',
                Text: 'You have been successfully signed in.'
            })
        } else {
            this.notifications.push({
                Title: `Signed out`,
                Icon: 'right-from-bracket',
                Color: 'orange',
                Text: 'You have been logged out.'
            })
        }
    }
}