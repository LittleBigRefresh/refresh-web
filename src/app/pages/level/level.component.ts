import {Component, Inject, PLATFORM_ID} from '@angular/core';
import {Level} from "../../api/types/levels/level";
import {ClientService} from "../../api/client.service";
import {ActivatedRoute} from "@angular/router";
import {SlugPipe} from "../../pipes/slug.pipe";
import {PageTitleComponent} from "../../components/ui/text/page-title.component";
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
import {ContainerTitleComponent} from "../../components/ui/text/container-title.component";
import {LevelLeaderboardComponent} from "../../components/items/level-leaderboard.component";
import {DividerComponent} from "../../components/ui/divider.component";
import {PaneTitleComponent} from "../../components/ui/text/pane-title.component";
import { ButtonGroupComponent } from "../../components/ui/form/button-group.component";
import { ButtonTwoStateComponent } from "../../components/ui/form/button-two-state.component"
import {faHeart, faBell} from "@fortawesome/free-solid-svg-icons";
import {AuthenticationService} from "../../api/authentication.service";


@Component({
  selector: 'app-level',
  standalone: true,
    imports: [
        LevelStatisticsComponent,
        DefaultPipe,
        LevelAvatarComponent,
        UserLinkComponent,
        FancyHeaderComponent,
        GamePipe,
        AsyncPipe,
        DateComponent,
        TwoPaneLayoutComponent,
        ContainerComponent,
        ContainerTitleComponent,
        LevelLeaderboardComponent,
        DividerComponent,
        PaneTitleComponent,
        ButtonGroupComponent,
        ButtonTwoStateComponent
    ],
  providers: [
      SlugPipe
  ],
  templateUrl: './level.component.html',
  styles: ``
})
export class LevelComponent {
  level: Level | undefined | null;
  protected readonly isBrowser: boolean;
  protected isMobile: boolean = false;

  protected ownUserId: string | undefined;
  protected heartButtonState: boolean = false;
  protected queueButtonState: boolean = false;

  constructor(private embed: EmbedService, private client: ClientService, private slug: SlugPipe,
              route: ActivatedRoute, protected layout: LayoutService, private auth: AuthenticationService,
              @Inject(PLATFORM_ID) platformId: Object)
  {
    this.isBrowser = isPlatformBrowser(platformId);
    route.params.subscribe(params => {
      const id: number = +params['id'];
      this.client.getLevelById(id).subscribe(data => this.setDataFromLevel(data));
    });
    
    this.layout.isMobile.subscribe(v => {
        this.isMobile = v;
    })

    auth.user.subscribe(user => {
      this.ownUserId = user?.userId;
    })
  }

  setDataFromLevel(data: Level) {
    this.level = data;

    if(this.isBrowser) {
      window.history.replaceState({}, '', `/level/${data.levelId}/${this.slug.transform(data.title)}`);
    }

    this.embed.embedLevel(data);

    if (this.level?.isHeartedByUser !== undefined) {
      this.heartButtonState = this.level?.isHeartedByUser; 
    }
    if (this.level?.isQueuedByUser !== undefined) {
      this.queueButtonState = this.level?.isQueuedByUser;
    }
  }

  heart() {
    if (this.level === undefined || this.level === null) return;
    this.client.setLevelAsHearted(this.level).subscribe(_ => { 
      this.heartButtonState = true;
    });
  }

  unheart() {
    if (this.level === undefined || this.level === null) return;
    this.client.setLevelAsUnhearted(this.level).subscribe(_ => {
      this.heartButtonState = false;
    });
  }

  queue() {
    if (this.level === undefined || this.level === null) return;
    this.client.setLevelAsQueued(this.level).subscribe(_ => {
      this.queueButtonState = true;
    });
  }

  dequeue() {
    if (this.level === undefined || this.level === null) return;
    this.client.setLevelAsDequeued(this.level).subscribe(_ => {
      this.queueButtonState = false;
    });
  }

  protected readonly faHeart = faHeart;
  protected readonly faBell = faBell; 
}
