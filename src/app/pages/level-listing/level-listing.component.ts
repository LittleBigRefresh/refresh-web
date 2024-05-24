import {Component, OnInit} from '@angular/core';
import {LevelCategory} from "../../api/types/levels/level-category";
import {ClientService} from "../../api/client.service";
import {ActivatedRoute} from "@angular/router";
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

      this.setCategoryByRoute(route);
    })
  }

  setCategoryByRoute(route: string) {
    this.client.getLevelCategories().subscribe(list => {
      for (let category of list.data) {
        if (category.apiRoute != route) continue;

        this.category = category;
        return;
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
    this.client.getLevelsInCategory(this.category.apiRoute, this.listInfo.nextPageIndex).subscribe(list => {
      this.isLoading = false;

      this.levels = this.levels.concat(list.data);
      this.listInfo = list.listInfo;
    });
  }
}
