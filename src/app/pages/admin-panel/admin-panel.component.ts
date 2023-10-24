import {Component, OnInit} from '@angular/core';
import {ApiClient} from "../../api/api-client.service";
import {faBullhorn, faCheck, faUserPlus, faUsers, faWrench, faPencil} from "@fortawesome/free-solid-svg-icons";
import {Router} from "@angular/router";
import {ExtendedUser} from "../../api/types/extended-user";
import {Announcement} from "../../api/types/announcement";
import {Instance} from "../../api/types/instance";
import {UserRoles} from "../../api/types/user-roles";
import {AdminStatistic} from "../../api/types/admin/admin-statistic";
import {DomSanitizer, SafeUrl} from "@angular/platform-browser";

@Component({
  selector: 'app-admin-panel',
  templateUrl: './admin-panel.component.html'
})
export class AdminPanelComponent implements OnInit {
  announcementTitle: string = "Example Announcement"
  announcementBody: string = "This is an example announcement. Start typing on the left and preview your announcement here!"

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
  protected readonly faUserPlus = faUserPlus;
  protected readonly faPencil = faPencil;
}
