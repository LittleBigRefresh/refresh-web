import {Component, Input, OnInit} from '@angular/core';
import {User} from "../../../../api/types/users/user";
import {NgIf} from "@angular/common";
import {UserAvatarComponent} from "../../photos/user-avatar.component";
import {UserRouterLinkComponent} from "./user-router-link.component";
import {ClientService} from "../../../../api/client.service";

@Component({
    selector: 'app-user-link',
    standalone: true,
    imports: [
        NgIf,
        UserAvatarComponent,
        UserRouterLinkComponent,
    ],
    template: `
        <span *ngIf=!user class="ml-1">{{username}}</span>
        <app-user-router-link class="ml-1 inline" [user]=user *ngIf=user>
            <app-user-avatar [user]=user class="inline mr-1"></app-user-avatar>
            <span>{{ user.username }}</span>
        </app-user-router-link>
    `
})
export class UserLinkComponent implements OnInit {
    @Input({required: true}) public user: User | undefined | null;
    @Input() public userId: string | undefined;
    @Input() public username: string = "Deleted User";

    constructor(private client: ClientService) {
    }

    ngOnInit(): void {
        if (this.user != null) return;
        if (this.userId == undefined) return;
        this.client.getUserById(this.userId).subscribe(data => {
            this.user = data;
        });
    }
}
