import { Component } from '@angular/core';
import {faPencil} from "@fortawesome/free-solid-svg-icons/faPencil";
import {ApiClient} from "../../api/api-client";
import {faBullhorn} from "@fortawesome/free-solid-svg-icons";
import {Router} from "@angular/router";
import {OwnUser} from "../../api/types/own-user";
import {Announcement} from "../../api/types/announcement";
import {Instance} from "../../api/types/instance";

@Component({
  selector: 'app-admin-panel',
  templateUrl: './admin-panel.component.html'
})
export class AdminPanelComponent {
  protected readonly announcementTitleId: string = "announcement-title-id"
  protected readonly announcementBodyId: string = "announcement-body-id"

  protected readonly faPencil = faPencil;

  public previewAnnouncement: Announcement = {title: "Title", text: "Body"};
  public instance: Instance | undefined = undefined;

  constructor(private apiClient: ApiClient, router: Router) {
    this.apiClient.userWatcher.subscribe((data) => {
      this.redirectIfNotAdmin(data, router);
    })

    this.apiClient.GetInstanceInformation().subscribe(data => {
      this.instance = data;
    })
  }

  private redirectIfNotAdmin(data: OwnUser | undefined, router: Router) {
    if(data === undefined || data.role < 127) {
      router.navigate(['/']);
      return;
    }
  }

  postAnnouncement() {
    const titleInput: HTMLInputElement = (<HTMLInputElement>document.getElementById(this.announcementTitleId));
    const bodyInput: HTMLInputElement = (<HTMLInputElement>document.getElementById(this.announcementBodyId));

    this.apiClient.AddAnnouncement(titleInput.value, bodyInput.value);
  }

  updateAnnouncementPreview() {
    const titleInput: HTMLInputElement = (<HTMLInputElement>document.getElementById(this.announcementTitleId));
    const bodyInput: HTMLInputElement = (<HTMLInputElement>document.getElementById(this.announcementBodyId));

    this.previewAnnouncement.title = titleInput.value;
    this.previewAnnouncement.text = bodyInput.value;
  }

  protected readonly faBullhorn = faBullhorn;
}
