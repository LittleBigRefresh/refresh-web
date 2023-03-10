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
}