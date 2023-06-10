import { HttpErrorResponse } from '@angular/common/http';
import {Component, OnInit} from '@angular/core';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import * as moment from 'dayjs';
import { EMPTY, catchError, of, switchMap, tap } from 'rxjs';
import { ApiClient } from 'src/app/api/api-client';
import { Room } from 'src/app/api/types/rooms/room';
import { User } from 'src/app/api/types/user';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html'
})
export class UserComponent implements OnInit {
    user: User | undefined = undefined;
    room: Room | undefined = undefined;

    constructor(private route: ActivatedRoute, private apiClient: ApiClient, private router: Router) {}

    ngOnInit(): void {
      this.route.paramMap.pipe(switchMap((params: ParamMap) => {
        const username = params.get('username') as string | undefined;
        const uuid = params.get('uuid') as string | undefined;

        if (username == "me" || uuid == "me") {
          if(this.apiClient.user === undefined) {
            this.router.navigate(["/login"]);
            return EMPTY;
          }

          this.router.navigate(["/user/", this.apiClient.user?.Username]);
          return EMPTY;
        }

        if (uuid !== null && uuid !== undefined) {
          return this.getUserByUuid(uuid);
        }

        if (username == null) return EMPTY;

        return this.getUserByUsername(username);
      }))
      .subscribe();
    }

    getMoment(timestamp: number): string {
      if(timestamp == 0) return "Here since before time was invented";
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

            window.history.replaceState({}, '', `/user/${data?.Username}`);
            this.getUsersRoom(data.UserId).subscribe();
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

            this.getUsersRoom(data?.UserId).subscribe();
          })
        );
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
}
