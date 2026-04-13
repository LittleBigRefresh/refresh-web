import { Component } from '@angular/core';
import {ClientService} from "../../api/client.service";
import { PageTitleComponent } from "../../components/ui/text/page-title.component";
import { ExtendedUser } from '../../api/types/users/extended-user';
import { AuthenticationService } from '../../api/authentication.service';
import { UserRoles } from '../../api/types/users/user-roles';
import { BannerService } from '../../banners/banner.service';
import { Instance } from '../../api/types/instance';
import { Statistics } from '../../api/types/statistics';
import { RefreshApiError } from '../../api/refresh-api-error';
import { blockedFlagsAsString } from '../../api/types/asset-config-flags';
import { DividerComponent } from "../../components/ui/divider.component";
import { FormControl, FormGroup } from '@angular/forms';
import { AnnouncementComponent } from "../../components/items/announcement.component";
import { Announcement } from '../../api/types/announcement';
import { faBullhorn, faPaperPlane, faPencil, faSignOutAlt, faTrash } from '@fortawesome/free-solid-svg-icons';
import { TextboxComponent } from "../../components/ui/form/textbox.component";
import { TextAreaComponent } from "../../components/ui/form/textarea.component";
import { ButtonComponent } from "../../components/ui/form/button.component";
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';
import { RouterLink } from "@angular/router";
import { TwoPaneLayoutComponent } from "../../components/ui/layouts/two-pane-layout.component";
import { ContainerComponent } from "../../components/ui/container.component";
import { PaneTitleComponent } from "../../components/ui/text/pane-title.component";
import { ConfirmationDialogComponent } from "../../components/ui/confirmation-dialog.component";

@Component({
    selector: 'app-mod-panel',
    imports: [
    PageTitleComponent,
    DividerComponent,
    AnnouncementComponent,
    TextboxComponent,
    TextAreaComponent,
    ButtonComponent,
    RouterLink,
    TwoPaneLayoutComponent,
    ContainerComponent,
    PaneTitleComponent,
    ConfirmationDialogComponent
],
    templateUrl: './mod-panel.component.html'
})
export class ModPanelComponent {
  protected ownUser: ExtendedUser | null | undefined;

  protected instance: Instance | undefined;
  protected instanceDownloadFailed: boolean = false;
  protected announcements: Announcement[] | undefined;
  protected announcementsDownloadFailed: boolean = false;
  protected blockedAssetFlags: String = "None";
  protected blockedAssetFlagsForTrustedUsers: String = "None";

  protected statistics: Statistics | undefined;
  protected statisticsDownloadFailed: boolean = false;

  protected previewAnnouncement: Announcement = {
    announcementId: "",
    title: "",
    text: "",
    createdAt: undefined,
  };
  protected announcementForm = new FormGroup({
    title: new FormControl(),
    text: new FormControl(),
  });
  protected isAnnouncementComplete: boolean = false;
  protected showAnnouncementPostDialog: boolean = false;

  protected grafanaSafeUrl: SafeUrl | undefined;

  constructor(private auth: AuthenticationService, private client: ClientService, protected banner: BannerService, private sanitizer: DomSanitizer) {
    this.auth.user.subscribe(user => {
      if (user) {
        if (user.role < UserRoles.Moderator) {
          this.banner.error("You are not a moderator", "Get out!");
        }
        else {
          this.ownUser = user;

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

              // initialize sanitized URL
              let originalUrl = this.instance?.grafanaDashboardUrl;
              if (originalUrl != null && originalUrl.length > 0) {
                this.grafanaSafeUrl = this.sanitizer.bypassSecurityTrustResourceUrl(originalUrl);
              }
            }
          });
      
          client.getStatistics().subscribe({
            error: error => {
              this.statisticsDownloadFailed = true;
              const apiError: RefreshApiError | undefined = error.error?.error;
              this.banner.error("Failed to retrieve instance statistics", apiError == null ? error.message : apiError.message);
            },
            next: response => {
              this.statistics = response;
            }
          });

          client.getAllAnnouncements().subscribe({
            error: error => {
              this.announcementsDownloadFailed = true;
              const apiError: RefreshApiError | undefined = error.error?.error;
              this.banner.error("Failed to retrieve announcements", apiError == null ? error.message : apiError.message);
            },
            next: response => {
              this.announcements = response;
            }
          });
        }
      }
    });
  }

  protected checkAnnouncementTitleChanges() {
    let currentTitle: string = this.announcementForm.controls.title.getRawValue();
    this.previewAnnouncement.title = currentTitle;
    this.checkAnnouncementCompleteness();
  }

  protected checkAnnouncementTextChanges() {
    let currentText: string = this.announcementForm.controls.text.getRawValue();
    this.previewAnnouncement.text = currentText;
    this.checkAnnouncementCompleteness();
  }

  protected checkAnnouncementCompleteness() {
    this.isAnnouncementComplete = this.previewAnnouncement.title.length > 0 && this.previewAnnouncement.text.length > 0;
  }

  protected resetAnnouncementInputs() {
    this.isAnnouncementComplete = false;
    this.announcementForm.controls.title.setValue("");
    this.announcementForm.controls.text.setValue("");

    this.previewAnnouncement = {
      announcementId: "",
      title: "",
      text: "",
      createdAt: undefined,
    };
  }

  protected toggleAnnouncementPostDialog(visibility: boolean) {
    this.showAnnouncementPostDialog = visibility;
  }

  protected postAnnouncement() {
    if (!this.isAnnouncementComplete) return;
    this.toggleAnnouncementPostDialog(false);

    this.client.postAnnouncement(this.previewAnnouncement).subscribe({
      error: error => {
        const apiError: RefreshApiError | undefined = error.error?.error;
        this.banner.error("Failed to post the announcement", apiError == null ? error.message : apiError.message);
      },
      next: response => {
        this.resetAnnouncementInputs();
        let newList: Announcement[] = [];
        newList.push(response);

        if (!this.announcements) this.announcements = newList
        else this.announcements = newList.concat(this.announcements);
      }
    });
  }

  protected removeAnnouncement(uuid: string) {
    if (this.announcements == null) return;

    let newList: Announcement[] = [];
    for (let announcement of this.announcements) {
      if (announcement.announcementId !== uuid) newList.push(announcement);
    }

    this.announcements = newList;
  }

  protected readonly faBullhorn = faBullhorn;
  protected readonly faPencil = faPencil;
  protected readonly faPaperPlane = faPaperPlane;
  protected readonly faTrash = faTrash;
  protected readonly faSignOutAlt = faSignOutAlt;
}
