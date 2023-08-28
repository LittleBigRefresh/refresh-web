import {Component, OnInit} from '@angular/core';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { catchError } from 'rxjs';
import { ApiClient } from 'src/app/api/api-client';
import { Level } from 'src/app/api/types/level';
import { of } from 'rxjs';
import { HttpErrorResponse } from '@angular/common/http';
import {GenerateEmptyList, masonryOptions} from "../../app.component";

const pageSize: number = 10;

@Component({
  selector: 'app-level-listing',
  templateUrl: './level-listing.component.html',
})
export class LevelListingComponent implements OnInit {
  levels: Level[] | undefined = undefined;
  routeName!: string

  processedRoute: string = ''

  nextPageIndex: number = pageSize + 1;
  total: number = 0;

  constructor(private apiClient: ApiClient, private router: Router, private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.route.paramMap.subscribe((params: ParamMap) => {
      const apiRoute: string | null = params.get('route');
      if(apiRoute == null) return;

      this.routeName = apiRoute;
      this.processedRoute = this.processRoute(apiRoute);

      const pipe = this.apiClient.GetLevelListing(apiRoute, pageSize, 0)
        .pipe(catchError((error: HttpErrorResponse, caught) => {
          console.warn(error)
          if(error.status === 404) {
            this.router.navigate(["/404"]);
            return of();
          }

          return caught;
        }));

        pipe.subscribe(data => {
          this.levels = data.items;
          this.total = data.listInfo.totalItems;
        })
    })
  }

  // Instead of just showing the route in PascalCase in the level category, we can process the route and make it look nicer.
  private processRoute(route: string): string {
    const routeMap: { [key: string]: string } = {
      'mostLiked': 'Most Liked',
      'mostHearted': 'Most Loved',
      'mostPlayed': 'Most Played',
      'teamPicks': 'Team Picked',
      'currentlyPlaying': 'Busiest',
      'byUser': 'Your',
    };

    return routeMap[route] || route; // Default to the original route if it's not found in the mapping.
  }
  loadNextPage(intersecting: boolean): void {
    if(!intersecting) return;

    if(this.nextPageIndex <= 0) return; // This is the server telling us there's no more data

    this.apiClient.GetLevelListing(this.routeName, pageSize, this.nextPageIndex).subscribe((data) => {
      this.levels = this.levels!.concat(data.items);
      this.nextPageIndex = data.listInfo.nextPageIndex;
      this.total = data.listInfo.totalItems;
    });
  }

  protected readonly masonryOptions = masonryOptions;
  protected readonly GenerateEmptyList = GenerateEmptyList;
}
