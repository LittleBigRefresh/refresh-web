import { Component } from '@angular/core';
import {ClientService} from "../../api/client.service";
import {Contest} from "../../api/types/contests/contest";
import {PageTitleComponent} from "../../components/ui/text/page-title.component";
import {ContestBannerComponent} from "../../components/items/contest-banner.component";

import {RouterLink} from "@angular/router";
import {Instance} from "../../api/types/instance";
import {PluralPipe} from "../../pipes/plural.pipe";
import {ContainerComponent} from "../../components/ui/container.component";
import {ContainerTitleComponent} from "../../components/ui/text/container-title.component";
import {DividerComponent} from "../../components/ui/divider.component";

@Component({
  selector: 'app-contest-listing',
  standalone: true,
  imports: [
    PageTitleComponent,
    ContestBannerComponent,
    RouterLink,
    PluralPipe,
    ContainerComponent,
    ContainerTitleComponent,
    DividerComponent
],
  templateUrl: './contest-listing.component.html'
})
export class ContestListingComponent {
  contests: Contest[] | undefined;
  instance: Instance | undefined;

  constructor(client: ClientService) {
    client.getContests().subscribe(list => {
      this.contests = list.data;
    });

    client.getInstance().subscribe(data => {
      this.instance = data;
    })
  }
}
