import {Component, Inject, PLATFORM_ID} from '@angular/core';
import {Level} from "../../api/types/levels/level";
import {ClientService} from "../../api/client.service";
import {ActivatedRoute} from "@angular/router";
import {SlugPipe} from "../../pipes/slug.pipe";
import { AsyncPipe, isPlatformBrowser, } from "@angular/common";
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
import {AuthenticationService} from "../../api/authentication.service";
import { ExtendedUser } from '../../api/types/users/extended-user';
import { FancyHeaderLevelButtonAreaComponent } from '../../components/ui/layouts/fancy-header-level-button-area';


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
      FancyHeaderLevelButtonAreaComponent
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
  protected ownUser: ExtendedUser | undefined;

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
      this.ownUser = user;
    })
  }

  setDataFromLevel(data: Level) {
    this.level = data;
    if(this.isBrowser) {
      window.history.replaceState({}, '', `/level/${data.levelId}/${this.slug.transform(data.title)}`);
    }

    this.embed.embedLevel(data);
  }
}
