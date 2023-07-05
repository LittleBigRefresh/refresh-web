import {Component, OnInit} from '@angular/core';
import {faPencil} from "@fortawesome/free-solid-svg-icons/faPencil";
import {ApiClient} from "../../api/api-client";
import {User} from "../../api/types/user";
import {UserUpdateRequest} from "../../api/types/user-update-request";

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
})
export class SettingsComponent implements OnInit {
  descriptionId: string = "settings-description";

  protected readonly faPencil = faPencil;

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
  }

  saveChanges() {
    const descriptionInput: HTMLInputElement = (<HTMLInputElement>document.getElementById(this.descriptionId));

    let request: UserUpdateRequest = {
      description: descriptionInput.value
    };

    this.apiClient.UpdateUser(request);
  }
}
