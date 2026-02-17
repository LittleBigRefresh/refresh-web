import { Component } from '@angular/core';
import {User} from "../../api/types/users/user";
import {TitleService} from "../../services/title.service";
import {ClientService} from "../../api/client.service";
import {ActivatedRoute} from "@angular/router";
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
    FancyHeaderUserButtonsComponent
],
    templateUrl: './user.component.html',
    styles: ``
})
export class UserComponent {
  user: User | undefined | null;
  relations: UserRelations | undefined;
  protected ownUser: ExtendedUser | undefined;
  protected isMobile: boolean = false;

  constructor(private auth: AuthenticationService, private client: ClientService, route: ActivatedRoute, protected layout: LayoutService) {
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
      });
    });

    this.layout.isMobile.subscribe(v => this.isMobile = v);
  }
}
