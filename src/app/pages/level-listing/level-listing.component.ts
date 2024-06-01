import {Component, OnInit} from '@angular/core';
import {LevelCategory} from "../../api/types/levels/level-category";
import {ClientService, defaultPageSize} from "../../api/client.service";
import {ActivatedRoute, Params} from "@angular/router";
import {PageTitleComponent} from "../../components/ui/text/page-title.component";
import {NgForOf, NgIf} from "@angular/common";
import {CategoriesComponent} from "../categories/categories.component";
import {ResponsiveGridComponent} from "../../components/ui/responsive-grid.component";
import {Level} from "../../api/types/levels/level";
import {LevelPreviewComponent} from "../../components/items/level-preview.component";
import {ContainerComponent} from "../../components/ui/container.component";
import {Scrollable} from "../../helpers/scrollable";
import {defaultListInfo, RefreshApiListInfo} from "../../api/refresh-api-list-info";
import {InfiniteScrollerComponent} from "../../components/ui/infinite-scroller.component";

@Component({
  selector: 'app-level-listing',
  standalone: true,
  imports: [
    PageTitleComponent,
    NgIf,
    CategoriesComponent,
    ResponsiveGridComponent,
    LevelPreviewComponent,
    NgForOf,
    ContainerComponent,
    InfiniteScrollerComponent
  ],
  templateUrl: './level-listing.component.html'
})
export class LevelListingComponent implements OnInit, Scrollable {
  category: LevelCategory | null | undefined = undefined;
  levels: Level[] = [];

  private queryParams: Params = {};

  constructor(private client: ClientService, private route: ActivatedRoute) {
    // Start requesting category information immediately.
    this.client.getLevelCategories().subscribe();
  }

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      const route: string | null = params.get('category');

      if(route == null) {
        this.category = null;
        return;
      }

      this.route.queryParams.subscribe((params: Params) => {
        this.queryParams = params;
        this.setCategoryByRoute(route);
      });
    })
  }

  setCategoryByRoute(route: string) {
    // clear out any bad state left by previous pages
    this.reset();

    this.client.getLevelCategories().subscribe(list => {
      for (let category of list.data) {
        if (category.apiRoute != route) continue;

        this.category = category;
      }

      // if we're still here without a category, set as null (marker for not found)
      if(this.category === undefined)
        this.category = null;

      if(this.category)
        this.loadData();
    });
  }

  isLoading: boolean = false;
  listInfo: RefreshApiListInfo = defaultListInfo;

  loadData(): void {
    if(!this.category) return;

    this.isLoading = true;
    this.client.getLevelsInCategory(this.category.apiRoute, this.listInfo.nextPageIndex, defaultPageSize, this.queryParams).subscribe(list => {
      this.isLoading = false;

      this.levels = this.levels.concat(list.data);
      this.listInfo = list.listInfo;
    });
  }

  reset(): void {
    this.levels = [];
    this.isLoading = false;
    this.listInfo = defaultListInfo;
  }
}
