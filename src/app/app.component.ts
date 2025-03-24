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
import {LayoutService} from "./services/layout.service";
import {AsyncPipe} from "@angular/common";
import {HeaderMobileComponent} from "./components/ui/header/mobile/header-mobile.component";

const fadeLength: string = "100ms";

@Component({
    selector: 'app-root',
    imports: [RouterOutlet, HeaderComponent, PopupBannerContainerComponent, AsyncPipe, HeaderMobileComponent],
    templateUrl: './app.component.html',
    animations: [
        trigger('routeAnimations', [
            transition('* => *', [
                group([
                    query(':leave', [
                        style({ opacity: 1, 'grid-column': 1, 'grid-row': 1 }),
                        animate(fadeLength, style({ opacity: 0 }))
                    ], { optional: true }),
                    query(':enter', [
                        style({ opacity: 0, 'grid-column': 1, 'grid-row': 1 }),
                        animate(fadeLength, style({ opacity: 1 }))
                    ], { optional: true }),
                ])
            ])
        ])
    ]
})
export class AppComponent {
  constructor(private title: TitleService,
              private embed: EmbedService,
              private auth: AuthenticationService,
              protected layout: LayoutService,
              protected bannerService: BannerService,
              library: FaIconLibrary) {
    library.addIconPacks(fas)
  }
}
