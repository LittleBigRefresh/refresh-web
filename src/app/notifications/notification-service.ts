import { Injectable } from "@angular/core";
import { Notification } from "./notification";

@Injectable({providedIn: 'root'})
export class NotificationService {
    notifications: Notification[] = []

    push(notification: Notification) {
        this.notifications.push(notification);
    }

    dismiss(id: number): void {
        this.notifications.splice(id, 1);
    }

    pushSuccess(title: string, text: string) {
        this.push({
            Color: 'green',
            Icon: 'check-circle',
            Text: text,
            Title: title,
        })
    }

    pushWarning(title: string, text: string) {
        this.push({
            Color: 'yellow',
            Icon: 'warning',
            Text: text,
            Title: title,
        })
    }

    pushError(title: string, text: string) {
        this.push({
            Color: 'red',
            Icon: 'exclamation-circle',
            Text: text,
            Title: title,
        })
    }
}