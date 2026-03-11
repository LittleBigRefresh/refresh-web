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
  scores: Score[] = []; // TODO: cache score lists
  private queryParams: Params = {};
  protected mayDeleteScores: boolean = false;
  
  protected readonly isBrowser: boolean;
  protected isMobile: boolean = false;
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

            route.queryParams.subscribe((params: Params) => {
              this.queryParams = params;
            });
          }
        }
      });
    });

    this.layout.isMobile.subscribe(v => this.isMobile = v);
  }

  isLoading: boolean = false;
  listInfo: RefreshApiListInfo = defaultListInfo;

  loadData(): void {
    if(!this.level) return;

    let scoreType: number = this.filterForm.controls.scoreType.getRawValue() ?? 0;
    this.isLoading = true;

    this.client.getScoresForLevel(this.level.levelId, scoreType, this.listInfo.nextPageIndex, defaultPageSize, this.queryParams).subscribe({
      error: error => {
        this.isLoading = false;
        const apiError: RefreshApiError | undefined = error.error?.error;
        this.banner.warn("Failed to get scores", apiError == null ? error.message : apiError.message);
      },
      next: list => {
        this.isLoading = false;

        this.scores = this.scores.concat(list.data);
        this.listInfo = list.listInfo;
      }
    });
  }

  reset(): void {
    this.scores = [];
    this.isLoading = false;
    this.listInfo = defaultListInfo;
  }

  scoreTypeButtonClick() {
    this.showFilterMenu = !this.showFilterMenu;
  }

  setScoreType(type: number) {
    this.filterForm.controls.scoreType.setValue(type);
    this.reset();
    this.loadData();
  }

  removeScore(index: number) {
    let oldList: Score[] = this.scores;
    this.scores = [];
    for (let i = 0; i < oldList.length; i++) {
      if (i !== index) this.scores.push(oldList[i]);
    }
  }

  protected readonly faTrash = faTrash;
  protected readonly faUser = faUser;
  protected readonly faChevronDown = faChevronDown;
  protected readonly faChevronUp = faChevronUp;
  protected readonly faUsers = faUsers;
}
