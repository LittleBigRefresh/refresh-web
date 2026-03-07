import {Component, Inject, PLATFORM_ID} from '@angular/core';
import {Level} from "../../api/types/levels/level";
import {ClientService} from "../../api/client.service";
import {ActivatedRoute, RouterLink} from "@angular/router";
import {SlugPipe} from "../../pipes/slug.pipe";
import { AsyncPipe, isPlatformBrowser } from "@angular/common";
import {LevelStatisticsComponent} from "../../components/items/level-statistics.component";
import {DefaultPipe} from "../../pipes/default.pipe";
import {LevelAvatarComponent} from "../../components/ui/photos/level-avatar.component";
import {UserLinkComponent} from "../../components/ui/text/links/user-link.component";
import {EmbedService} from "../../services/embed.service";
import {FancyHeaderComponent} from "../../components/ui/layouts/fancy-header.component";
import {GamePipe} from "../../pipes/game.pipe";
import {LayoutService} from "../../services/layout.service";
import {DateComponent} from "../../components/ui/info/date.component";
import {TwoPaneLayoutComponent} from "../../components/ui/layouts/two-pane-layout.component";
import {ContainerComponent} from "../../components/ui/container.component";

import {DividerComponent} from "../../components/ui/divider.component";
import {PaneTitleComponent} from "../../components/ui/text/pane-title.component";
import {EventPageComponent} from "../../components/items/event-page.component";
import {ActivityPage} from "../../api/types/activity/activity-page";

import {AuthenticationService} from "../../api/authentication.service";
import { ExtendedUser } from '../../api/types/users/extended-user';
import { FancyHeaderLevelButtonsComponent } from '../../components/ui/layouts/fancy-header-level-buttons.component';
import { LevelRelations } from '../../api/types/levels/level-relations';
import { OriginalPublisherRouterLink } from "../../components/ui/text/links/original-publisher-router-link.component";
import { LargerLabelComponent } from "../../components/ui/info/larger-label.component";
import { TooltipComponent } from "../../components/ui/text/tooltip.component";
import { FormControl, FormGroup } from '@angular/forms';
import { ButtonComponent } from '../../components/ui/form/button.component';
import { RadioButtonComponent } from '../../components/ui/form/radio-button.component';
import { ScoreTypePipe } from '../../pipes/score-type.pipe';
import { LevelType } from '../../api/types/levels/level-type';
import { DropdownMenuComponent } from "../../components/ui/form/dropdown-menu.component";
import { faChevronDown, faChevronUp } from '@fortawesome/free-solid-svg-icons';
import { ScorePreviewComponent } from "../../components/items/score-preview.component";
import { Score } from '../../api/types/levels/score';
import { BannerService } from '../../banners/banner.service';
import { RefreshApiError } from '../../api/refresh-api-error';


@Component({
    selector: 'app-level',
    imports: [
    LevelStatisticsComponent,
    DefaultPipe,
    LevelAvatarComponent,
    UserLinkComponent,
    FancyHeaderComponent,
    FancyHeaderLevelButtonsComponent,
    GamePipe,
    AsyncPipe,
    DateComponent,
    TwoPaneLayoutComponent,
    ContainerComponent,
    DividerComponent,
    PaneTitleComponent,
    EventPageComponent,
    RouterLink,
    SlugPipe,
    OriginalPublisherRouterLink,
    LargerLabelComponent,
    TooltipComponent,
    ButtonComponent,
    RadioButtonComponent,
    DropdownMenuComponent,
    ScoreTypePipe,
    ScorePreviewComponent
],
    providers: [
        SlugPipe,
        ScoreTypePipe
    ],
    templateUrl: './level.component.html'
})
export class LevelComponent {
  level: Level | undefined | null;
  scores: Score[] = [];
  activityPage: ActivityPage | undefined;
  
  protected readonly isBrowser: boolean;
  protected isMobile: boolean = false;
  protected ownUser: ExtendedUser | undefined;
  protected relations: LevelRelations | undefined;

  scoreFilterForm = new FormGroup({
    scoreType: new FormControl(0)
  });
  protected showScoreFilterMenu: boolean = false;

  constructor(private embed: EmbedService, private client: ClientService, private slug: SlugPipe,
              route: ActivatedRoute, protected layout: LayoutService, private auth: AuthenticationService,
              @Inject(PLATFORM_ID) platformId: Object, protected banner: BannerService)
  {
    this.isBrowser = isPlatformBrowser(platformId);
    route.params.subscribe(params => {
      const id: number = +params['id'];
      this.client.getLevelById(id).subscribe({
        error: error => {
          const apiError: RefreshApiError | undefined = error.error?.error;
          this.banner.warn("Failed to get level", apiError == null ? error.message : apiError.message);
        },
        next: data => {
          this.setDataFromLevel(data);
          this.auth.user.subscribe(user => {
            if(user) {
              this.ownUser = user;
            }
          });
        }
      });
    });

    this.layout.isMobile.subscribe(v => this.isMobile = v);
  }

  setDataFromLevel(data: Level) {
    this.level = data;
    this.relations = data.ownRelations;

    if(this.isBrowser) {
      window.history.replaceState({}, '', `/level/${data.levelId}/${this.slug.transform(data.title)}`);
    }

    this.embed.embedLevel(data);

    this.client.getActivityPageForLevel(data.levelId, 0, 20).subscribe({
      error: error => {
        const apiError: RefreshApiError | undefined = error.error?.error;
        this.banner.warn("Failed to get recent activity for level", apiError == null ? error.message : apiError.message);
      },
      next: page => {
        this.activityPage = page;
      }
    });

    // Type doesn't matter for cutscenes
    this.setScoreType(data.levelType === LevelType.Cutscene ? 0 : 1);
  }

  scoreTypeButtonClick() {
    this.showScoreFilterMenu = !this.showScoreFilterMenu;
  }

  setScoreType(type: number) {
    this.scoreFilterForm.controls.scoreType.setValue(type);
    this.getScores(type);
  }

  private getScores(type: number) {
    if (!this.level) return;

    this.client.getScoresForLevel(this.level.levelId, type, 0, 10).subscribe({
      error: error => {
        const apiError: RefreshApiError | undefined = error.error?.error;
        this.banner.warn("Failed to get scores for level", apiError == null ? error.message : apiError.message);
      },
      next: scorePage => {
        this.scores = scorePage.data;
      }
    });
  }

  protected readonly faChevronDown = faChevronDown;
  protected readonly faChevronUp = faChevronUp;
}