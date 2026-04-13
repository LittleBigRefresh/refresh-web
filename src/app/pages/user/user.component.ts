import { Component } from '@angular/core';
import {User} from "../../api/types/users/user";
import {ClientService} from "../../api/client.service";
import { ActivatedRoute, RouterLink } from "@angular/router";
import {DefaultPipe} from "../../pipes/default.pipe";
import { AsyncPipe } from "@angular/common";
import {UserAvatarComponent} from "../../components/ui/photos/user-avatar.component";
import {DateComponent} from "../../components/ui/info/date.component";
import {FancyHeaderComponent} from "../../components/ui/layouts/fancy-header.component";
import {LayoutService} from "../../services/layout.service";
import {UserStatusComponent} from "../../components/ui/info/user-status.component";
import {UserStatisticsComponent} from "../../components/items/user-statistics.component";
import { UserRelations } from '../../api/types/users/user-relations';
import { FancyHeaderUserButtonsComponent } from "../../components/ui/layouts/fancy-header-user-buttons.component";
import { ExtendedUser } from '../../api/types/users/extended-user';
import { AuthenticationService } from '../../api/authentication.service';
import { TwoPaneLayoutComponent } from "../../components/ui/layouts/two-pane-layout.component";
import { ContainerComponent } from "../../components/ui/container.component";
import { PaneTitleComponent } from "../../components/ui/text/pane-title.component";
import { DropdownMenuComponent } from "../../components/ui/form/dropdown-menu.component";
import { ButtonComponent } from "../../components/ui/form/button.component";
import { RadioButtonComponent } from "../../components/ui/form/radio-button.component";
import { Level } from '../../api/types/levels/level';
import { Photo } from '../../api/types/photos/photo';
import { FormControl, FormGroup } from '@angular/forms';
import { faChevronDown, faChevronUp } from '@fortawesome/free-solid-svg-icons';
import { DividerComponent } from "../../components/ui/divider.component";
import { BannerService } from '../../banners/banner.service';
import { RefreshApiError } from '../../api/refresh-api-error';
import { LevelPreviewComponent } from "../../components/items/level-preview.component";
import { PhotoComponent } from "../../components/items/photo.component";
import { DarkContainerComponent } from "../../components/ui/dark-container.component";
import { ListWithData } from '../../api/list-with-data';
import { defaultListInfo } from '../../api/refresh-api-list-info';
import { UserRoleComponent } from "../../components/ui/info/user-role.component";

@Component({
    selector: 'app-user',
    imports: [
    DefaultPipe,
    UserAvatarComponent,
    DateComponent,
    FancyHeaderComponent,
    AsyncPipe,
    UserStatusComponent,
    UserStatisticsComponent,
    FancyHeaderUserButtonsComponent,
    TwoPaneLayoutComponent,
    ContainerComponent,
    PaneTitleComponent,
    RouterLink,
    DropdownMenuComponent,
    ButtonComponent,
    RadioButtonComponent,
    DividerComponent,
    LevelPreviewComponent,
    PhotoComponent,
    DarkContainerComponent,
    UserRoleComponent,
],
    templateUrl: './user.component.html',
    styles: ``
})
export class UserComponent {
  user: User | undefined | null;
  relations: UserRelations | undefined;
  protected ownUser: ExtendedUser | undefined;
  protected isMobile: boolean = false;

  levelsPublishedByUser: ListWithData<Level> | undefined;
  levelsHeartedByUser: ListWithData<Level> | undefined;
  currentLevels: ListWithData<Level> = {
    data: [],
    listInfo: defaultListInfo,
  };

  showLevelDropdown: boolean = false;
  levelSelectionString: string = "";
  levelForm = new FormGroup({
    selection: new FormControl(0)
  });

  photosByUser: ListWithData<Photo> | undefined;
  photosWithUser: ListWithData<Photo> | undefined;
  currentPhotos: ListWithData<Photo> = {
    data: [],
    listInfo: defaultListInfo,
  };

  showPhotoDropdown: boolean = false;
  photoSelectionString: string = "";
  photoForm = new FormGroup({
    selection: new FormControl(0)
  });

  constructor(private auth: AuthenticationService, private client: ClientService, route: ActivatedRoute, protected layout: LayoutService,
    protected banner: BannerService
  ) {
    route.params.subscribe(params => {
      const username: string | undefined = params['username'];
      const uuid: string | undefined = params['uuid'];

      this.client.getUserByEitherLookup(username, uuid).subscribe(user => {
        this.user = user;
        this.relations = user.ownRelations;

        this.auth.user.subscribe(user => {
          if(user) {
            this.ownUser = user;
          }
        });

        this.getLevels(0);
        this.getPhotos(0);
      });
    });

    this.layout.isMobile.subscribe(v => this.isMobile = v);
  }

  levelSelectionButtonClick() {
    this.showLevelDropdown = !this.showLevelDropdown;
  }

  getLevels(selection: number) {
    if (this.user == null) return;
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
    this.levelForm.controls.selection.setValue(selection);

    if (cachedList != null) {
      this.currentLevels = cachedList;
      return;
    }

    this.client.getLevelsInCategory(this.levelSelectionString, 0, 5, {u: this.user.username}).subscribe({
      error: error => {
        const apiError: RefreshApiError | undefined = error.error?.error;
        this.banner.warn("Failed to get levels", apiError == null ? error.message : apiError.message);
      },
      next: levelPage => {
        // cache the page
        switch (selection) {
          case 0:
            this.levelsPublishedByUser = levelPage;
            break;
          case 1:
            this.levelsHeartedByUser = levelPage;
            break;
        }

        this.currentLevels = levelPage;
      }
    });
  }

  getLevelSelectionText(selection: number): string {
    switch (selection) {
      case 0: return "Published by user";
      case 1: return "Hearted by user";
      default: return "Something by user";
    }
  }

  photoSelectionButtonClick() {
    this.showPhotoDropdown = !this.showPhotoDropdown;
  }

  getPhotos(selection: number) {
    if (this.user == null) return;
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
    this.photoForm.controls.selection.setValue(selection);

    if (cachedList != null) {
      this.currentPhotos = cachedList;
      return;
    }

    
    this.client.getPhotosRelatedToUserUuid(this.user.userId, this.photoSelectionString, 0, 2).subscribe({
      error: error => {
        const apiError: RefreshApiError | undefined = error.error?.error;
        this.banner.warn("Failed to get photos with user", apiError == null ? error.message : apiError.message);
      },
      next: photoPage => {
        // cache the page
        switch (selection) {
          case 0:
            this.photosByUser = photoPage;
            break;
          case 1:
            this.photosWithUser = photoPage;
            break;
        }

        this.currentPhotos = photoPage;
      }
    });
  }

  getPhotoSelectionText(selection: number): string {
    switch (selection) {
      case 0: return "By user";
      case 1: return "With user";
      default: return "Something user";
    }
  }

  protected readonly faChevronDown = faChevronDown;
  protected readonly faChevronUp = faChevronUp;
}
