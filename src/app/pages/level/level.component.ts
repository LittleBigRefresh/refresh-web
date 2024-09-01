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
        DateComponent
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

  constructor(private embed: EmbedService, private client: ClientService, private slug: SlugPipe,
              route: ActivatedRoute, protected layout: LayoutService, @Inject(PLATFORM_ID) platformId: Object)
  {
    this.isBrowser = isPlatformBrowser(platformId);
    route.params.subscribe(params => {
      const id: number = +params['id'];
      this.client.getLevelById(id).subscribe(data => this.setDataFromLevel(data));
    });
    
    this.layout.isMobile.subscribe(v => {
        this.isMobile = v;
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
