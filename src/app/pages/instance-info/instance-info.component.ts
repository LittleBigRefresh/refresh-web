import {Component} from '@angular/core';
import {PageTitleComponent} from "../../components/ui/text/page-title.component";
import {ClientService} from "../../api/client.service";
import { Instance } from '../../api/types/instance';
import { Statistics } from '../../api/types/statistics';
import { RefreshApiError } from '../../api/refresh-api-error';
import { BannerService } from '../../banners/banner.service';
import { NgOptimizedImage } from "@angular/common";
import { getWebsiteRepoUrl } from '../../helpers/data-fetching';
import { RouterLink } from "@angular/router";
import { blockedFlagsAsString } from '../../api/types/asset-config-flags';
import { TwoPaneLayoutComponent } from "../../components/ui/layouts/two-pane-layout.component";
import { ContainerComponent } from "../../components/ui/container.component";
import { PaneTitleComponent } from "../../components/ui/text/pane-title.component";
import { DividerComponent } from "../../components/ui/divider.component";

@Component({
    selector: 'app-instance-info',
    imports: [
    PageTitleComponent,
    NgOptimizedImage,
    RouterLink,
    TwoPaneLayoutComponent,
    ContainerComponent,
    PaneTitleComponent,
    DividerComponent
],
    templateUrl: './instance-info.component.html'
})
export class InstanceInfoComponent {
  protected instance: Instance | undefined;
  protected instanceDownloadFailed: boolean = false;

  protected statistics: Statistics | undefined;
  protected statisticsDownloadFailed: boolean = false;

  protected websiteRepoUrl: String = getWebsiteRepoUrl();
  protected iconError: boolean = false;

  protected blockedAssetFlags: String = "None";
  protected blockedAssetFlagsForTrustedUsers: String = "None";

  constructor(private client: ClientService, protected banner: BannerService) {
    client.getInstance().subscribe({
      error: error => {
        this.instanceDownloadFailed = true;
        const apiError: RefreshApiError | undefined = error.error?.error;
        this.banner.error("Failed to retrieve instance data", apiError == null ? error.message : apiError.message);
      },
      next: response => {
        this.instance = response;
        this.blockedAssetFlags = blockedFlagsAsString(response.blockedAssetFlags);
        this.blockedAssetFlagsForTrustedUsers = blockedFlagsAsString(response.blockedAssetFlagsForTrustedUsers);
      }
    });

    client.getStatistics(true).subscribe({
      error: error => {
        this.statisticsDownloadFailed = true;
        const apiError: RefreshApiError | undefined = error.error?.error;
        this.banner.error("Failed to retrieve instance statistics", apiError == null ? error.message : apiError.message);
      },
      next: response => {
        this.statistics = response;
      }
    });
  }

  iconErr(img: EventTarget | null): void {
    if(this.iconError) return;
    this.iconError = true;

    if(!(img instanceof HTMLImageElement)) return;
    img.srcset = "/assets/logo.svg";
  }
}
