import { HttpErrorResponse } from '@angular/common/http';
import { Component } from '@angular/core';
import { ActivatedRoute, ParamMap, Route, Router } from '@angular/router';
import * as moment from 'moment';
import { catchError, of } from 'rxjs';
import { ApiClient } from 'src/app/api/api-client';
import { User } from 'src/app/api/types/user';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html'
})
export class UserComponent {
    user: User | undefined = undefined;

    constructor(private route: ActivatedRoute, private apiClient: ApiClient, private router: Router) {}

    ngOnInit(): void {
      this.route.paramMap.subscribe((params: ParamMap) => {
        const uuid = params.get('uuid') as string | undefined;
        
        if(uuid == "me") {
          this.router.navigate(["/user/", this.apiClient.user?.UserId]);
          return;
        }

        if(uuid == null) return;
        
        this.apiClient.GetUserByUuid(uuid)
        .pipe(catchError((error: HttpErrorResponse, caught) => {
          console.warn(error)
          if (error.status === 404) {
            this.router.navigate(["/404"]);
            return of(undefined)
          }
  
          return caught;
        }))
        .subscribe(data => {
          this.user = data;
        });
      });
    }

    getMoment(timestamp: number): string {
      if(timestamp == 0) return "Here since before time was invented";
      return "Joined " + moment(timestamp).fromNow();
    }
}
