import { Component } from '@angular/core';
import {PageTitleComponent} from "../../../components/ui/text/page-title.component";
import {ButtonGroupComponent} from "../../../components/ui/form/button-group.component";
import {ButtonComponent} from "../../../components/ui/form/button.component";
import {faCheckCircle} from "@fortawesome/free-solid-svg-icons";
import {BannerService} from "../../../banners/banner.service";

@Component({
    selector: 'app-notifications',
    imports: [
        PageTitleComponent,
        ButtonGroupComponent,
        ButtonComponent
    ],
    templateUrl: './notifications.component.html'
})
export class NotificationsComponent {
  protected readonly faCheckCircle = faCheckCircle;

  constructor(private bannerService: BannerService) {
  }

  bannerSuccess() {
    this.bannerService.success("You Did It", "Congration On Doing The Thing");
  }
}
