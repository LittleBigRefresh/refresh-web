import { Component } from '@angular/core';
import {User} from "../../api/types/users/user";
import {TitleService} from "../../services/title.service";
import {ClientService} from "../../api/client.service";
import {ActivatedRoute} from "@angular/router";

@Component({
  selector: 'app-user',
  standalone: true,
  imports: [],
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
