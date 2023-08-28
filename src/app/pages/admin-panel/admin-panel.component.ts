import {Component, OnInit} from '@angular/core';
import {faPencil} from "@fortawesome/free-solid-svg-icons/faPencil";
import {ApiClient} from "../../api/api-client";
import {faBullhorn, faCheck, faRegistered, faUserPlus, faUsers, faWrench} from "@fortawesome/free-solid-svg-icons";
import {Router} from "@angular/router";
import {ExtendedUser} from "../../api/types/extended-user";
import {Announcement} from "../../api/types/announcement";
import {Instance} from "../../api/types/instance";
import {UserRoles} from "../../api/types/user-roles";
import {User} from "../../api/types/user";
import {Statistics} from "../../api/types/statistics";
import {AdminStatistic} from "../../api/types/admin/admin-statistic";
import {DomSanitizer, SafeUrl} from "@angular/platform-browser";
import {startWith} from "rxjs";

@Component({
  selector: 'app-admin-panel',
  templateUrl: './admin-panel.component.html'
})
export class AdminPanelComponent implements OnInit {
  announcementTitle: string = "Example Announcement"
  announcementBody: string = "This is an example announcement. Start typing on the left and preview your announcement here!"

  protected readonly faPencil = faPencil;

  public instance: Instance | undefined = undefined;
  public user: ExtendedUser | undefined = undefined;

  public statistics: AdminStatistic[] = [];

  constructor(private apiClient: ApiClient, private router: Router, private sanitizer: DomSanitizer) {}

  ngOnInit(): void {
    this.apiClient.userWatcher
      .subscribe((data) => {
        this.redirectIfNotAdmin(data, this.router);
        this.user = data;
      });

    this.apiClient.GetInstanceInformation().subscribe(data => {
      this.instance = data;
    });

    this.apiClient.GetServerStatistics().subscribe(data => {
      this.statistics = [];
      this.statistics.push({ unit: "user", count: data.totalUsers });
      this.statistics.push({ unit: "photo", count: data.totalPhotos });
      this.statistics.push({ unit: "level", count: data.totalLevels });
      this.statistics.push({ unit: "event", count: data.totalEvents });
    });
  }

  private redirectIfNotAdmin(data: ExtendedUser | undefined, router: Router) {
    if(data === undefined || data.role < UserRoles.Admin) {
      router.navigate(['/']);
      return;
    }
  }

  postAnnouncement() {
    this.apiClient.AdminAddAnnouncement(this.announcementTitle, this.announcementBody);
  }

  removeAnnouncement(announcement: Announcement) {
    this.apiClient.AdminRemoveAnnouncement(announcement.announcementId);
  }

  getSanitizedGrafanaURL(): SafeUrl {
    return this.sanitizer.bypassSecurityTrustResourceUrl(this.instance?.grafanaDashboardUrl!);
  }

  protected readonly faBullhorn = faBullhorn;
  protected readonly faWrench = faWrench;
  protected readonly faCheck = faCheck;
  protected readonly faUsers = faUsers;
  protected readonly faRegistered = faRegistered;
  protected readonly faUserPlus = faUserPlus;
}
