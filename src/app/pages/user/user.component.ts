import { Component } from '@angular/core';
import {User} from "../../api/types/users/user";
import {TitleService} from "../../services/title.service";
import {ClientService} from "../../api/client.service";
import {ActivatedRoute} from "@angular/router";
import {DefaultPipe} from "../../pipes/default.pipe";
import {AsyncPipe, NgIf} from "@angular/common";
import {UserAvatarComponent} from "../../components/ui/photos/user-avatar.component";
import {DateComponent} from "../../components/ui/date.component";
import {FancyHeaderComponent} from "../../components/ui/layouts/fancy-header.component";
import {LayoutService} from "../../services/layout.service";

@Component({
  selector: 'app-user',
  standalone: true,
    imports: [
        DefaultPipe,
        NgIf,
        UserAvatarComponent,
        DateComponent,
        FancyHeaderComponent,
        AsyncPipe
    ],
  templateUrl: './user.component.html',
  styles: ``
})
export class UserComponent {
  user: User | undefined | null;

  constructor(private title: TitleService, private client: ClientService, route: ActivatedRoute, protected layout: LayoutService) {
    route.params.subscribe(params => {
      const username: string | undefined = params['username'];
      const uuid: string | undefined = params['uuid'];

      this.client.getUserByEitherLookup(username, uuid).subscribe(user => {
        this.user = user;
      })
    })
  }
}
