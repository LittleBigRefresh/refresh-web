import {Component, OnInit} from '@angular/core';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import * as moment from 'dayjs';
import { catchError } from 'rxjs';
import { ApiClient } from 'src/app/api/api-client';
import { Level } from 'src/app/api/types/level';
import { of } from 'rxjs';
import { HttpErrorResponse } from '@angular/common/http';
import {NgxMasonryOptions} from "ngx-masonry";
import {ApiListResponse} from "../../api/types/response/api-list-response";
import {animate, style} from "@angular/animations";
import {masonryOptions} from "../../app.component";

@Component({
  selector: 'app-level-listing',
  templateUrl: './level-listing.component.html',
})
export class LevelListingComponent implements OnInit {
  levels: Level[] = []
  routeName!: string

  constructor(private apiClient: ApiClient, private router: Router, private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.route.paramMap.subscribe((params: ParamMap) => {
      const apiRoute: string | null = params.get('route');
      if(apiRoute == null) return;

      this.routeName = apiRoute;

      const pipe = this.apiClient.GetLevelListing(apiRoute)
        .pipe(catchError((error: HttpErrorResponse, caught) => {
          console.warn(error)
          if(error.status === 404) {
            this.router.navigate(["/404"]);
            return of();
          }

          return caught;
        }));

        pipe.subscribe(data => this.levels = data.items)
    })
  }

  getMoment(timestamp: number): string {
    return moment(timestamp).fromNow();
  }

  protected readonly masonryOptions = masonryOptions;
}
