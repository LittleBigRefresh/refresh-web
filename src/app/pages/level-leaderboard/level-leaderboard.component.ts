import {Component, Inject, PLATFORM_ID} from '@angular/core';
import {Level} from "../../api/types/levels/level";
import {ClientService, defaultPageSize} from "../../api/client.service";
import {ActivatedRoute, Params, Router} from "@angular/router";
import { AsyncPipe, isPlatformBrowser, NgClass, NgIf } from "@angular/common";
import {LayoutService} from "../../services/layout.service";
import {AuthenticationService} from "../../api/authentication.service";
import { ExtendedUser } from '../../api/types/users/extended-user';
import { UserRoles } from '../../api/types/users/user-roles';
import { PageTitleComponent } from "../../components/ui/text/page-title.component";
import { ButtonComponent } from "../../components/ui/form/button.component";
import { faChevronDown, faChevronUp, faTrash, faUser, faUsers } from '@fortawesome/free-solid-svg-icons';
import { FormControl, FormGroup } from '@angular/forms';
import { BannerService } from '../../banners/banner.service';
import { RefreshApiError } from '../../api/refresh-api-error';
import { RadioButtonComponent } from "../../components/ui/form/radio-button.component";
import { DropdownMenuComponent } from "../../components/ui/form/dropdown-menu.component";
import { SlugPipe } from '../../pipes/slug.pipe';
import { Score } from '../../api/types/levels/score';
import { ScoreTypePipe } from '../../pipes/score-type.pipe';
import { defaultListInfo, RefreshApiListInfo } from '../../api/refresh-api-list-info';
import { InfiniteScrollerComponent } from "../../components/ui/infinite-scroller.component";
import { ScorePreviewComponent } from "../../components/items/score-preview.component";
import { LevelLinkComponent } from "../../components/ui/text/links/level-link.component";
import { ContainerHeaderComponent } from "../../components/ui/container-header.component";
import { LevelType } from '../../api/types/levels/level-type';
import { ListWithData } from '../../api/list-with-data';

@Component({
    selector: 'app-level-leaderboard',
    imports: [
    PageTitleComponent,
    ButtonComponent,
    RadioButtonComponent,
    DropdownMenuComponent,
    InfiniteScrollerComponent,
    ScorePreviewComponent,
    ScoreTypePipe,
    LevelLinkComponent,
    ContainerHeaderComponent
],
    providers: [
        SlugPipe,
        ScoreTypePipe
    ],
    templateUrl: './level-leaderboard.component.html'
})
export class LevelLeaderboardComponent {
  level: Level | undefined | null;
  // TODO: probably rethink this way of caching once we start using more filters (showAll etc)
  scoresPerType: Map<number, ListWithData<Score>> = new Map();
  currentScores: Score[] = []; // current view of the scores
  listInfo: RefreshApiListInfo = defaultListInfo;
  isLoading: boolean = false;
  
  //private queryParams: Params = {};
  protected mayDeleteScores: boolean = false;
  
  protected readonly isBrowser: boolean;
  protected ownUser: ExtendedUser | undefined;

  filterForm = new FormGroup({
    // TODO: showAll parameter
    scoreType: new FormControl(0)
  });
  showFilterMenu: boolean = false;

  constructor(private client: ClientService, protected banner: BannerService, route: ActivatedRoute, 
              protected layout: LayoutService, private auth: AuthenticationService,
              @Inject(PLATFORM_ID) platformId: Object, private router: Router, private slug: SlugPipe)
  {
    this.isBrowser = isPlatformBrowser(platformId);

    route.params.subscribe(params => {
      const id: number = +params['id'];
      this.client.getLevelById(id).subscribe({
        error: error => {
          const apiError: RefreshApiError | undefined = error.error?.error;
          this.banner.warn("Failed to get level", apiError == null ? error.message : apiError.message);
        },

        next: response => {
          if (response) {
            this.level = response;
            // Type doesn't matter for cutscenes
            this.filterForm.controls.scoreType.setValue(response.levelType === LevelType.Cutscene ? 0 : 1);

            this.auth.user.subscribe(user => {
              if (user) {
                this.ownUser = user;
                this.mayDeleteScores = user.role >= UserRoles.Moderator;
              }
            })

            if(this.isBrowser) {
              window.history.replaceState({}, '', `/level/${response.levelId}/${this.slug.transform(response.title)}/leaderboard`);
            }

            /*
            route.queryParams.subscribe((params: Params) => {
              this.queryParams = params;
            });
            */
          }
        }
      });
    });
  }

  getNextPage(): void {
    if(!this.level) return;

    let scoreType: number = this.filterForm.controls.scoreType.getRawValue() ?? 0;
    this.isLoading = true;

    this.client.getScoresForLevel(this.level.levelId, scoreType, this.listInfo.nextPageIndex, defaultPageSize).subscribe({
      error: error => {
        this.isLoading = false;
        const apiError: RefreshApiError | undefined = error.error?.error;
        this.banner.warn("Failed to get scores", apiError == null ? error.message : apiError.message);
      },
      next: list => {
        this.isLoading = false;

        this.currentScores = this.currentScores.concat(list.data);
        this.listInfo = list.listInfo;
      }
    });
  }

  setScoreType(type: number) {
    let previousType: number = this.filterForm.controls.scoreType.getRawValue()!;
    this.scoresPerType.set(previousType, {
      listInfo: this.listInfo,
      data: this.currentScores,
    });

    this.filterForm.controls.scoreType.setValue(type);
    
    let cachedList: ListWithData<Score> | undefined = this.scoresPerType.get(type);
    if (cachedList != null) {
      this.currentScores = cachedList.data;
      this.listInfo = cachedList.listInfo;
      return;
    }

    this.currentScores = [];
    this.listInfo = defaultListInfo;
    this.getNextPage();
  }

  reset(): void {
    this.currentScores = [];
    this.isLoading = false;
    this.listInfo = defaultListInfo;
  }

  scoreTypeButtonClick() {
    this.showFilterMenu = !this.showFilterMenu;
  }

  removeScore(uuid: string) {
    // Remove from cache
    for (let [scoreType, oldList] of this.scoresPerType) {

      let newList: Score[] = [];
      for (let score of oldList.data) {
        if (score.scoreId !== uuid) newList.push(score);
      }

      oldList.listInfo.totalItems--;
      oldList.listInfo.nextPageIndex--;

      this.scoresPerType.set(scoreType, {
        listInfo: oldList.listInfo,
        data: newList,
      });
    }

    // Remove from current list
    let newCurrentList: Score[] = [];
    for (let score of this.currentScores) {
      if (score.scoreId !== uuid) newCurrentList.push(score);
    }

    this.currentScores = newCurrentList;
    this.listInfo.totalItems--;
    this.listInfo.nextPageIndex--;
  }

  protected readonly faTrash = faTrash;
  protected readonly faUser = faUser;
  protected readonly faChevronDown = faChevronDown;
  protected readonly faChevronUp = faChevronUp;
  protected readonly faUsers = faUsers;
}
