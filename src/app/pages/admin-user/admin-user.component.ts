import {Component, OnInit} from '@angular/core';
import {EMPTY, switchMap, tap} from "rxjs";
import {ActivatedRoute, ParamMap, Router} from "@angular/router";
import {ApiClient} from "../../api/api-client";
import {faBan, faCalendar, faFlag, faGavel} from "@fortawesome/free-solid-svg-icons";
import {faPencil} from "@fortawesome/free-solid-svg-icons/faPencil";
import {ExtendedUser} from "../../api/types/extended-user";
import {UserRoles} from "../../api/types/user-roles";

@Component({
  selector: 'app-admin-user',
  templateUrl: './admin-user.component.html'
})
export class AdminUserComponent implements OnInit {
  user: ExtendedUser | undefined = undefined;

  public readonly reasonId: string = "admin-user-punish-reason";
  public readonly dateId: string = "admin-user-punish-date";

  constructor(private route: ActivatedRoute, private apiClient: ApiClient, private router: Router) {}

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

          const reasonInput: HTMLInputElement = (<HTMLInputElement>document.getElementById(this.reasonId));
          const dateInput: HTMLInputElement = (<HTMLInputElement>document.getElementById(this.dateId));

          if(data.banReason !== null) {
            reasonInput.value = data.banReason;
            dateInput.valueAsDate = new Date(data.banExpiryDate!);
          }
        })
      );
  }

  private punish(punishmentType: 'ban' | 'restrict') {
    const reasonInput: HTMLInputElement = (<HTMLInputElement>document.getElementById(this.reasonId));
    const dateInput: HTMLInputElement = (<HTMLInputElement>document.getElementById(this.dateId));

    if(this.user == undefined) return;
    this.apiClient.PunishUser(this.user, punishmentType, dateInput.valueAsDate!, reasonInput.value);

    this.user.banReason = reasonInput.value;
    this.user.banExpiryDate = dateInput.valueAsDate;
  }

  ban() {
    this.punish("ban");
  }

  restrict() {
    this.punish("restrict");
  }

  pardon() {
    if(this.user == undefined) return;
    this.apiClient.PardonUser(this.user);

    const reasonInput: HTMLInputElement = (<HTMLInputElement>document.getElementById(this.reasonId));
    const dateInput: HTMLInputElement = (<HTMLInputElement>document.getElementById(this.dateId));

    reasonInput.value = "";
    dateInput.value = "";

    this.user.banReason = null;
    this.user.banExpiryDate = null;
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
  protected readonly undefined = undefined;
}
