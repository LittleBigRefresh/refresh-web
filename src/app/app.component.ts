import {Component} from '@angular/core';
import { RouterOutlet } from '@angular/router';
import {HeaderComponent} from "./components/ui/header/header.component";
import {TitleService} from "./services/title.service";
import {EmbedService} from "./services/embed.service";
import {FaIconLibrary} from "@fortawesome/angular-fontawesome";
import {fas} from "@fortawesome/free-solid-svg-icons";
import {AuthenticationService} from "./api/authentication.service";
import {PopupBannerContainerComponent} from "./banners/popup-banner-container.component";
import {BannerService} from "./banners/banner.service";
import {animate, group, query, style, transition, trigger} from "@angular/animations";

const fadeLength: string = "100ms";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, HeaderComponent, PopupBannerContainerComponent],
  templateUrl: './app.component.html',
  animations: [
    trigger('routeAnimations', [
      transition('* => *', [
        group([
          query(':leave', [
            style({opacity: 1, 'grid-column': 1, 'grid-row': 1}),
            animate(fadeLength, style({opacity: 0}))
          ], {optional: true}),
          query(':enter', [
            style({opacity: 0, 'grid-column': 1, 'grid-row': 1}),
            animate(fadeLength, style({opacity: 1}))
          ], {optional: true}),
        ])
      ])
    ])
  ],
})
export class AppComponent {
  constructor(private title: TitleService,
              private embed: EmbedService,
              private auth: AuthenticationService,
              protected bannerService: BannerService,
              library: FaIconLibrary) {
    library.addIconPacks(fas)
  }
}
