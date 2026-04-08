import {Component, Inject, PLATFORM_ID} from '@angular/core';
import {ClientService, defaultPageSize} from "../../api/client.service";
import {ActivatedRoute} from "@angular/router";
import {PageTitleComponent} from "../../components/ui/text/page-title.component";
import {ResponsiveGridComponent} from "../../components/ui/responsive-grid.component";
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
import { Photo } from '../../api/types/photos/photo';
import { PhotoComponent } from "../../components/items/photo.component";
import { isPlatformBrowser } from '@angular/common';
import { RefreshApiError } from '../../api/refresh-api-error';

@Component({
    selector: 'app-photo-user-listing',
    imports: [
    PageTitleComponent,
    ResponsiveGridComponent,
    ContainerComponent,
    InfiniteScrollerComponent,
    UserLinkComponent,
    RadioButtonComponent,
    DropdownMenuComponent,
    ButtonComponent,
    ContainerHeaderComponent,
    PhotoComponent
],
    templateUrl: './photo-user-listing.component.html'
})
export class PhotoUserListingComponent implements Scrollable {
  user: User | undefined;
  photosByUser: ListWithData<Photo> | undefined;
  photosWithUser: ListWithData<Photo> | undefined;
  currentPhotos: Photo[] = [];
  currentListInfo: RefreshApiListInfo = defaultListInfo;

  showPhotoDropdown: boolean = false;
  photoSelectionString: string = "";
  filterForm = new FormGroup({
    selection: new FormControl(-1)
  });

  protected readonly isBrowser: boolean;

  constructor(private client: ClientService, protected banner: BannerService, private route: ActivatedRoute, @Inject(PLATFORM_ID) platformId: Object) {
    route.params.subscribe(params => {
      const username: string | undefined = params['username'];
      const category: string | undefined = params['category'];

      if (username != null) {
        this.client.getUserByUsername(username).subscribe({
          error: error => {
            const apiError: RefreshApiError | undefined = error.error?.error;
            this.banner.warn("Failed to get user", apiError == null ? error.message : apiError.message);
          },
          next: user => {
            this.user = user;

            if (category != null) {
              this.photoSelectionString = category;
              switch (category) {
                case "by":
                  this.setPhotoSelection(0);
                  break;
                case "with":
                  this.setPhotoSelection(1);
                  break;
                default:
                  this.banner.warn("Cannot get photos", "Selection '" + category + "' is unknown");
                  return;
              }
            }
          }
        });
      }
    });

    this.isBrowser = isPlatformBrowser(platformId);
  }

  photoSelectionButtonClick() {
    this.showPhotoDropdown = !this.showPhotoDropdown;
  }

  getPhotoSelectionText(selection: number): string {
    switch (selection) {
      case 0: return "By";
      case 1: return "With";
      default: return "Something";
    }
  }

  setPhotoSelection(selection: number) {
    if (this.user == null) return;

    let previousSelection: number = this.filterForm.controls.selection.getRawValue()!;
    if (selection === previousSelection) return;

    switch (previousSelection) {
      case 0:
        this.photosByUser = {
          data: this.currentPhotos,
          listInfo: this.currentListInfo
        };
        break;
      case 1:
        this.photosWithUser = {
          data: this.currentPhotos,
          listInfo: this.currentListInfo
        };
        break;
    }

    let cachedList: ListWithData<Photo> | undefined;
    switch (selection) {
      case 0:
        this.photoSelectionString = "by";
        cachedList = this.photosByUser;
        break;
      case 1:
        this.photoSelectionString = "with";
        cachedList = this.photosWithUser;
        break;
      default:
        this.banner.warn("Cannot get photos", "Selection " + selection + " is unknown");
        return;
    }

    this.filterForm.controls.selection.setValue(selection);
    if(this.isBrowser) {
      window.history.replaceState({}, '', `/photos/${this.photoSelectionString}/user/${this.user.username}`);
    }

    if (cachedList != null) {
      this.currentPhotos = cachedList.data;
      this.listInfo = cachedList.listInfo;
      return;
    }

    this.currentPhotos = [];
    this.listInfo = defaultListInfo;
    this.loadData();
  }

  isLoading: boolean = false;
  listInfo: RefreshApiListInfo = defaultListInfo;

  loadData(): void {
    if(!this.user) return;

    this.isLoading = true;
    this.client.getPhotosRelatedToUserUuid(this.user.userId, this.photoSelectionString, this.listInfo.nextPageIndex, defaultPageSize).subscribe(list => {
      this.isLoading = false;

      this.currentPhotos = this.currentPhotos.concat(list.data);
      this.listInfo = list.listInfo;
    });
  }

  protected readonly faChevronDown = faChevronDown;
  protected readonly faChevronUp = faChevronUp;
}
