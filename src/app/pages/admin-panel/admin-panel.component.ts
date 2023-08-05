import { Component } from '@angular/core';
import {faPencil} from "@fortawesome/free-solid-svg-icons/faPencil";
import {ApiClient} from "../../api/api-client";
import {faBullhorn} from "@fortawesome/free-solid-svg-icons";
import {AnnouncementComponent} from "../../components/announcement/announcement.component";

@Component({
  selector: 'app-admin-panel',
  templateUrl: './admin-panel.component.html'
})
export class AdminPanelComponent {
  protected readonly announcementTitleId: string = "announcement-title-id"
  protected readonly announcementBodyId: string = "announcement-body-id"

  protected readonly faPencil = faPencil;

  public previewAnnouncement: {title: string, body: string} = {title: "Title", body: "Body"};

  constructor(private apiClient: ApiClient) {
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
    this.previewAnnouncement.body = bodyInput.value;
  }

  protected readonly faBullhorn = faBullhorn;
}
