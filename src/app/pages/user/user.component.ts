import { HttpErrorResponse } from '@angular/common/http';
import {Component, OnInit} from '@angular/core';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import * as moment from 'dayjs';
import { EMPTY, catchError, of, switchMap, tap } from 'rxjs';
import {ApiClient, GetAssetImageLink} from 'src/app/api/api-client';
import { Room } from 'src/app/api/types/rooms/room';
import { User } from 'src/app/api/types/user';
import {UserRoles} from "../../api/types/user-roles";
import {faWrench} from "@fortawesome/free-solid-svg-icons";
import {ExtendedUser} from "../../api/types/extended-user";
import {EmbedService} from "../../services/embed.service";
import {TitleService} from "../../services/title.service";

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html'
})
export class UserComponent implements OnInit {
    user: User | undefined = undefined;
    room: Room | undefined = undefined;

  ownUser: ExtendedUser | undefined;

    constructor(private route: ActivatedRoute, private apiClient: ApiClient, private router: Router, private embedService: EmbedService, private titleService: TitleService) {}

    ngOnInit(): void {
      this.route.paramMap.pipe(switchMap((params: ParamMap) => {
        const username = params.get('username') as string | undefined;
        const uuid = params.get('uuid') as string | undefined;

        if (username == "me" || uuid == "me") {
          if(this.apiClient.user === undefined) {
            this.router.navigate(["/login"]);
            return EMPTY;
          }

          this.router.navigate(["/user/", this.apiClient.user?.username]);
          return EMPTY;
        }

        if (uuid !== null && uuid !== undefined) {
          return this.getUserByUuid(uuid);
        }

        if (username == null) return EMPTY;

        return this.getUserByUsername(username);
      })).pipe(catchError(err => {
          return of(undefined);
      })).subscribe();

      this.ownUser = this.apiClient.user;
      this.apiClient.userWatcher.subscribe((data) => {
        this.ownUser = data;
      });
    }

    getMoment(timestamp: Date): string {
      // weird hack to get methods here - date objects from the API are not real Dates
      if(new Date(timestamp).getTime() == 0) return "Here since before time was invented";
      return "Joined " + moment(timestamp).fromNow();
    }

    private getUserByUuid(uuid: string) {
      return this.apiClient.GetUserByUuid(uuid)
        .pipe(
          catchError((error: HttpErrorResponse, caught) => {
            console.warn(error);
            if (error.status === 404) {
              this.router.navigate(["/404"]);
              return of(undefined);
            }

            return caught;
          }),
          tap((data) => {
            this.user = data;
            if (data === undefined) return;

            window.history.replaceState({}, '', `/user/${data?.username}`);
            this.handleResolvedUser(data);
          })
        );
    }

    private getUserByUsername(username: string) {
      return this.apiClient.GetUserByUsername(username)
        .pipe(
          catchError((error: HttpErrorResponse, caught) => {
            console.warn(error);
            if (error.status === 404) {
              this.router.navigate(["/404"]);
              return of(undefined);
            }

            return caught;
          }),
          tap((data) => {
            this.user = data;
            if (data === undefined) return;

            this.handleResolvedUser(data);
          })
        );
    }

    private handleResolvedUser(user: User) {
        this.getUsersRoom(user.userId).subscribe();
        this.embedService.embedUser(user);
        this.titleService.setTitle(`${user.username}'s profile`);
    }

    private getUsersRoom(userId: string) {
      return this.apiClient.GetUsersRoom(userId)
        .pipe(
          catchError((error: HttpErrorResponse) => {
            console.warn(error);
            return of(undefined);
          }),
          tap((data) => {
            this.room = data;
          })
        );
    }

  protected readonly GetAssetImageLink = GetAssetImageLink;
  protected readonly UserRoles = UserRoles;
  protected readonly faWrench = faWrench;
  protected readonly undefined = undefined;
}
