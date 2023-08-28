import {Component, OnInit} from '@angular/core';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import {catchError} from 'rxjs';
import { ApiClient } from 'src/app/api/api-client';
import { Level } from 'src/app/api/types/level';
import { of } from 'rxjs';
import { HttpErrorResponse } from '@angular/common/http';
import {GenerateEmptyList, masonryOptions} from "../../app.component";
import {Category} from "../../api/types/category";

const pageSize: number = 10;

@Component({
  selector: 'app-level-listing',
  templateUrl: './level-listing.component.html',
})
export class LevelListingComponent implements OnInit {
  levels: Level[] | undefined = undefined;
  routeName!: string
  apiRoute: string = '';
  categories: Category[] = [];
  nextPageIndex: number = pageSize + 1;
  total: number = 0;

  constructor(private apiClient: ApiClient, private router: Router, private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.route.paramMap.subscribe((params: ParamMap) => {
      const apiRoute: string | null = params.get('route');
      if(apiRoute == null) return;
      this.apiRoute = apiRoute;
      console.log(this.apiRoute)
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

      const categoryPipe = this.apiClient.GetLevelCategories().pipe(catchError((error: HttpErrorResponse, caught) => {
        console.warn(error)
        return caught;
      }));
      categoryPipe.subscribe(data => {
        this.categories = data;
        this.routeName = this.getCategoryName(apiRoute);
      })
    })
  }
  // Instead of just showing the route in PascalCase in the level category, we can process the route and make it look nicer.
  private getCategoryName(apiRoute: string): string {
    const category = this.categories.find(cat => cat.apiRoute === apiRoute);
    return category ? category.name : '';
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
