import {Component, OnInit} from '@angular/core';
import {EMPTY, switchMap, tap} from "rxjs";
import {ActivatedRoute, ParamMap} from "@angular/router";
import {ApiClient} from "../../api/api-client";
import {
  faBan,
  faCalendar,
  faEarthAmerica,
  faFlag,
  faGavel,
  faTrash,
  faUser,
  faUsers
} from "@fortawesome/free-solid-svg-icons";
import {faPencil} from "@fortawesome/free-solid-svg-icons/faPencil";
import {ExtendedUser} from "../../api/types/extended-user";
import {UserRoles} from "../../api/types/user-roles";

@Component({
  selector: 'app-admin-user',
  templateUrl: './admin-user.component.html'
})
export class AdminUserComponent implements OnInit {
  user: ExtendedUser | undefined = undefined;

  reason: string = "";
  date: string = "";

  constructor(private route: ActivatedRoute, private apiClient: ApiClient) {}

  ngOnInit(): void {
    this.route.paramMap.pipe(switchMap((params: ParamMap) => {
      const uuid = params.get('uuid') as string | undefined;

      if (uuid !== null && uuid !== undefined) {
        return this.getUserByUuid(uuid);
      }

      return EMPTY;
    }))
      .subscribe();
  }

  private getUserByUuid(uuid: string) {
    return this.apiClient.GetExtendedUserByUuid(uuid)
      .pipe(tap((data) => {
          this.user = data;
          if (data === undefined) return;

          if(data.banReason !== null) {
            this.reason = data.banReason;
            this.date = data.banExpiryDate!.toString();
          }
        })
      );
  }

  private punish(punishmentType: 'ban' | 'restrict') {
    if(this.user == undefined) return;
    this.apiClient.AdminPunishUser(this.user, punishmentType, new Date(this.date), this.reason);

    this.user.banReason = this.reason;
    this.user.banExpiryDate = new Date(this.date);
  }

  ban() {
    this.punish("ban");
  }

  restrict() {
    this.punish("restrict");
  }

  pardon() {
    if(this.user == undefined) return;
    this.apiClient.AdminPardonUser(this.user);

    this.reason = "";
    this.date = "";

    this.user.banReason = null;
    this.user.banExpiryDate = null;
  }

  deletePlanets() {
    if(this.user == undefined) return;
    this.apiClient.AdminDeleteUserPlanets(this.user);
  }

  delete() {
    if(this.user == undefined) return;
    if(window.confirm("Are you sure you want to delete this user's account?")) {
      this.apiClient.AdminDeleteUser(this.user);
    }
  }

  getRole(role: number | undefined) {
    if(role == undefined) return "";
    return UserRoles.getRoleName(role);
  }

  protected readonly faPencil = faPencil;
  protected readonly faCalendar = faCalendar;
  protected readonly faGavel = faGavel;
  protected readonly faBan = faBan;
  protected readonly faFlag = faFlag;
  protected readonly faEarthAmerica = faEarthAmerica;
  protected readonly faTrash = faTrash;
  protected readonly faUser = faUser;
}
