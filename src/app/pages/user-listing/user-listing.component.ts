import {Component, OnInit} from '@angular/core';
import {UserCategory} from "../../api/types/users/user-category";
import {ClientService, defaultPageSize} from "../../api/client.service";
import {ActivatedRoute, Params} from "@angular/router";
import {PageTitleComponent} from "../../components/ui/text/page-title.component";


import {ResponsiveGridComponent} from "../../components/ui/responsive-grid.component";
import {User} from "../../api/types/users/user";
import {UserPreviewComponent} from "../../components/items/user-preview.component";
import {ContainerComponent} from "../../components/ui/container.component";
import {Scrollable} from "../../helpers/scrollable";
import {defaultListInfo, RefreshApiListInfo} from "../../api/refresh-api-list-info";
import {InfiniteScrollerComponent} from "../../components/ui/infinite-scroller.component";
import {EmbedService} from "../../services/embed.service";

@Component({
    selector: 'app-user-listing',
    imports: [
    PageTitleComponent,
    ResponsiveGridComponent,
    UserPreviewComponent,
    ContainerComponent,
    InfiniteScrollerComponent
],
    templateUrl: './user-listing.component.html'
})
export class UserListingComponent implements OnInit, Scrollable {
  category: UserCategory | null | undefined = undefined;
  users: User[] = [];

  private queryParams: Params = {};

  constructor(private client: ClientService, private embed: EmbedService, private route: ActivatedRoute) {
    // Start requesting category information immediately.
    this.client.getUserCategories().subscribe();
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

    this.client.getUserCategories().subscribe(list => {
      for (let category of list.data) {
        if (category.apiRoute != route) continue;

        this.category = category;
      }

      // if we're still here without a category, set as null (marker for not found)
      if(this.category === undefined)
        this.category = null;

      if(this.category) {
        this.loadData();
        this.embed.embedUserCategory(this.category)
      } else {
        console.warn("No category found for route " + route)
      }
    });
  }

  isLoading: boolean = false;
  listInfo: RefreshApiListInfo = defaultListInfo;

  loadData(): void {
    if(!this.category) return;

    this.isLoading = true;
    this.client.getUsersInCategory(this.category.apiRoute, this.listInfo.nextPageIndex, defaultPageSize, this.queryParams).subscribe(list => {
      this.isLoading = false;

      this.users = this.users.concat(list.data);
      this.listInfo = list.listInfo;
    });
  }

  reset(): void {
    this.users = [];
    this.isLoading = false;
    this.listInfo = defaultListInfo;
  }
}
