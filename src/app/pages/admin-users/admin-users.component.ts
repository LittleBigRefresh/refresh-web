import { Component } from '@angular/core';
import {ExtendedUser} from "../../api/types/extended-user";
import {ApiClient} from "../../api/api-client";
import * as moment from "dayjs";
import {UserRoles} from "../../api/types/user-roles";

@Component({
  selector: 'app-admin-users',
  templateUrl: './admin-users.component.html'
})
export class AdminUsersComponent {
  users: ExtendedUser[] | undefined;

  constructor(private apiClient: ApiClient) {}

  ngOnInit() {
    this.apiClient.AdminGetUsers().subscribe((data) => {
      this.users = data.items;
    });
  }
  getMoment(timestamp: Date): string {
    return moment(timestamp).fromNow();
  }

  getRole(role: number | undefined) {
    if(role == undefined) return "";
    return UserRoles.getRoleName(role);
  }
}
