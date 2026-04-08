import {Component, Inject, PLATFORM_ID} from '@angular/core';
import {ClientService, defaultPageSize} from "../../api/client.service";
import {ActivatedRoute} from "@angular/router";
import {PageTitleComponent} from "../../components/ui/text/page-title.component";
import {ResponsiveGridComponent} from "../../components/ui/responsive-grid.component";
import {Level} from "../../api/types/levels/level";
import {LevelPreviewComponent} from "../../components/items/level-preview.component";
import {ContainerComponent} from "../../components/ui/container.component";
import {Scrollable} from "../../helpers/scrollable";
import {defaultListInfo, RefreshApiListInfo} from "../../api/refresh-api-list-info";
import {InfiniteScrollerComponent} from "../../components/ui/infinite-scroller.component";
import { User } from '../../api/types/users/user';
import { UserLinkComponent } from "../../components/ui/text/links/user-link.component";
import { RadioButtonComponent } from "../../components/ui/form/radio-button.component";
import { DropdownMenuComponent } from "../../components/ui/form/dropdown-menu.component";
import { ButtonComponent } from "../../components/ui/form/button.component";
import { ContainerHeaderComponent } from "../../components/ui/container-header.component";
import { FormControl, FormGroup } from '@angular/forms';
import { ListWithData } from '../../api/list-with-data';
import { BannerService } from '../../banners/banner.service';
import { faChevronDown, faChevronUp } from '@fortawesome/free-solid-svg-icons';
import { isPlatformBrowser } from '@angular/common';

@Component({
    selector: 'app-level-user-listing',
    imports: [
    PageTitleComponent,
    ResponsiveGridComponent,
    LevelPreviewComponent,
    ContainerComponent,
    InfiniteScrollerComponent,
    UserLinkComponent,
    RadioButtonComponent,
    DropdownMenuComponent,
    ButtonComponent,
    ContainerHeaderComponent
],
    templateUrl: './level-user-listing.component.html'
})
export class LevelUserListingComponent implements Scrollable {
  user: User | undefined;
  levelsPublishedByUser: ListWithData<Level> | undefined;
  levelsHeartedByUser: ListWithData<Level> | undefined;
  currentLevels: Level[] = [];
  currentListInfo: RefreshApiListInfo = defaultListInfo;

  showLevelDropdown: boolean = false;
  levelSelectionString: string = "";
  filterForm = new FormGroup({
    selection: new FormControl(-1)
  });

  protected readonly isBrowser: boolean;

  constructor(private client: ClientService, protected banner: BannerService, private route: ActivatedRoute, @Inject(PLATFORM_ID) platformId: Object) {
    route.params.subscribe(params => {
      const username: string | undefined = params['username'];
      const category: string | undefined = params['category'];

      if (username != null) {
        this.client.getUserByUsername(username).subscribe(user => {
          this.user = user;

          if (category != null) {
            this.levelSelectionString = category;
            switch (category) {
              case "byUser":
                this.setLevelSelection(0);
                break;
              case "hearted":
                this.setLevelSelection(1);
                break;
              default:
                this.banner.warn("Cannot get levels", "Selection '" + category + "' is unknown");
                return;
            }
          }
        });
      }
    });

    this.isBrowser = isPlatformBrowser(platformId);
  }

  levelSelectionButtonClick() {
    this.showLevelDropdown = !this.showLevelDropdown;
  }

  getLevelSelectionText(selection: number): string {
    switch (selection) {
      case 0: return "Published by";
      case 1: return "Hearted by";
      default: "Something by";
    }
    return "";
  }

  setLevelSelection(selection: number) {
    if (this.user == null) return;

    let previousSelection: number = this.filterForm.controls.selection.getRawValue()!;
    if (selection === previousSelection) return;

    switch (previousSelection) {
      case 0:
        this.levelsPublishedByUser = {
          data: this.currentLevels,
          listInfo: this.currentListInfo
        };
        break;
      case 1:
        this.levelsHeartedByUser = {
          data: this.currentLevels,
          listInfo: this.currentListInfo
        };
        break;
    }

    let cachedList: ListWithData<Level> | undefined;
    switch (selection) {
      case 0:
        this.levelSelectionString = "byUser";
        cachedList = this.levelsPublishedByUser;
        break;
      case 1:
        this.levelSelectionString = "hearted";
        cachedList = this.levelsHeartedByUser;
        break;
      default:
        this.banner.warn("Cannot get levels", "Selection " + selection + " is unknown");
        return;
    }

    this.filterForm.controls.selection.setValue(selection);
    if(this.isBrowser) {
      window.history.replaceState({}, '', `/levels/${this.levelSelectionString}/user/${this.user.username}`);
    }

    if (cachedList != null) {
      this.currentLevels = cachedList.data;
      this.listInfo = cachedList.listInfo;
      return;
    }

    this.currentLevels = [];
    this.listInfo = defaultListInfo;
    this.loadData();
  }

  isLoading: boolean = false;
  listInfo: RefreshApiListInfo = defaultListInfo;

  loadData(): void {
    if(!this.user) return;

    this.isLoading = true;
    this.client.getLevelsInCategory(this.levelSelectionString, this.listInfo.nextPageIndex, defaultPageSize, {u: this.user.username}).subscribe(list => {
      this.isLoading = false;

      this.currentLevels = this.currentLevels.concat(list.data);
      this.listInfo = list.listInfo;
    });
  }

  protected readonly faChevronDown = faChevronDown;
  protected readonly faChevronUp = faChevronUp;
}
