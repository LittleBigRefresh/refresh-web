import { Component } from '@angular/core';
import {User} from "../../api/types/users/user";
import {TitleService} from "../../services/title.service";
import {ClientService} from "../../api/client.service";
import {ActivatedRoute} from "@angular/router";
import {ContainerHeaderComponent} from "../../components/ui/container-header.component";
import {DarkContainerComponent} from "../../components/ui/dark-container.component";
import {DefaultPipe} from "../../pipes/default.pipe";
import {LevelAvatarComponent} from "../../components/ui/photos/level-avatar.component";
import {LevelStatisticsComponent} from "../../components/items/level-statistics.component";
import {NgIf} from "@angular/common";
import {PageTitleComponent} from "../../components/ui/text/page-title.component";
import {UserLinkComponent} from "../../components/ui/text/links/user-link.component";
import {UserAvatarComponent} from "../../components/ui/photos/user-avatar.component";
import {DateComponent} from "../../components/ui/date.component";

@Component({
  selector: 'app-user',
  standalone: true,
  imports: [
    ContainerHeaderComponent,
    DarkContainerComponent,
    DefaultPipe,
    LevelAvatarComponent,
    LevelStatisticsComponent,
    NgIf,
    PageTitleComponent,
    UserLinkComponent,
    UserAvatarComponent,
    DateComponent
  ],
  templateUrl: './user.component.html',
  styles: ``
})
export class UserComponent {
  user: User | undefined | null;

  constructor(private title: TitleService, private client: ClientService, route: ActivatedRoute) {
    route.params.subscribe(params => {
      const username: string | undefined = params['username'];
      const uuid: string | undefined = params['uuid'];

      this.client.getUserByEitherLookup(username, uuid).subscribe(user => {
        this.user = user;
      })
    })
  }
}
