import { Component } from '@angular/core';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import * as moment from 'moment';
import { catchError } from 'rxjs';
import { ApiClient } from 'src/app/api/api-client';
import { Level } from 'src/app/api/types/level';
import { of } from 'rxjs';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-level-listing',
  templateUrl: './level-listing.component.html',
  styleUrls: ['./level-listing.component.scss']
})
export class LevelListingComponent {
  levels: Level[] = []
  routeName!: string
  constructor(private apiClient: ApiClient, private router: Router, private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.route.paramMap.subscribe((params: ParamMap) => {
      const apiRoute = params.get('route');
      if(apiRoute == null) return;

      this.routeName = apiRoute;

      const pipe = this.apiClient.GetLevelListing(apiRoute)
        .pipe(catchError((error: HttpErrorResponse, caught) => {
          console.warn(error)
          if(error.status === 404) {
            this.router.navigate(["/404"]);
            return of([])
          }

          return caught;
        }));

        pipe.subscribe(data => this.levels = data)
    })
  }

  getMoment(timestamp: number): string {
    return moment(timestamp).fromNow();
  }
}
