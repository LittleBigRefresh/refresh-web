import {Component, OnInit} from '@angular/core';
import {faPencil} from "@fortawesome/free-solid-svg-icons/faPencil";
import {ApiClient} from "../../api/api-client";
import {User} from "../../api/types/user";
import {UserUpdateRequest} from "../../api/types/user-update-request";
import {faKey} from "@fortawesome/free-solid-svg-icons";

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
})
export class SettingsComponent implements OnInit {
  descriptionId: string = "settings-description";
  allowIpId: string = "settings-allow-ip";

  protected readonly faPencil = faPencil;
  protected readonly faKey = faKey;

  constructor(private apiClient: ApiClient) {
  }

  ngOnInit(): void {
    this.apiClient.userWatcher.subscribe((data) => {
      this.updateInputs(data);
    })
    // FIXME: this is stupid
    setTimeout(() => {this.updateInputs(this.apiClient.user);}, 0);
  }

  updateInputs(data: User | undefined) {
    const descriptionInput: HTMLInputElement = (<HTMLInputElement>document.getElementById(this.descriptionId));
    descriptionInput.value = data?.description ?? "";

    // TODO: allow ip input isn't sent serverside
  }

  saveChanges() {
    const descriptionInput: HTMLInputElement = (<HTMLInputElement>document.getElementById(this.descriptionId));
    const allowIpInput: HTMLInputElement = (<HTMLInputElement>document.getElementById(this.allowIpId));

    let request: UserUpdateRequest = {
      description: descriptionInput.value,
      allowIpAuthentication: allowIpInput.checked,
    };

    this.apiClient.UpdateUser(request);
  }
}
