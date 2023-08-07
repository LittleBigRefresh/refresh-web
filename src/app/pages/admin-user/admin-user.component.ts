import {Component, OnInit} from '@angular/core';
import {User} from "../../api/types/user";
import {catchError, EMPTY, of, switchMap, tap} from "rxjs";
import {ActivatedRoute, ParamMap, Router} from "@angular/router";
import {ApiClient} from "../../api/api-client";
import {HttpErrorResponse} from "@angular/common/http";
import {faBan, faBullhorn, faCalendar, faCheck, faGavel, faHammer} from "@fortawesome/free-solid-svg-icons";
import {faPencil} from "@fortawesome/free-solid-svg-icons/faPencil";

@Component({
  selector: 'app-admin-user',
  templateUrl: './admin-user.component.html'
})
export class AdminUserComponent implements OnInit {
  user: User | undefined = undefined;

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
    return this.apiClient.GetUserByUuid(uuid)
      .pipe(tap((data) => {
          this.user = data;
          if (data === undefined) return;
        })
      );
  }

  private punish(punishmentType: 'ban' | 'restrict') {
    const reasonInput: HTMLInputElement = (<HTMLInputElement>document.getElementById(this.reasonId));
    const dateInput: HTMLInputElement = (<HTMLInputElement>document.getElementById(this.dateId));

    if(this.user == undefined) return;
    this.apiClient.PunishUser(this.user, punishmentType, dateInput.valueAsDate!, reasonInput.value);
  }

  ban() {
    this.punish("ban");
  }

  restrict() {
    this.punish("restrict");
  }

  protected readonly faPencil = faPencil;
  protected readonly faCalendar = faCalendar;
  protected readonly faHammer = faHammer;
  protected readonly faGavel = faGavel;
  protected readonly faBan = faBan;
  protected readonly undefined = undefined;
}
