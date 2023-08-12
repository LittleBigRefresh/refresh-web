import {Component, OnInit} from '@angular/core';
import {faPencil} from "@fortawesome/free-solid-svg-icons/faPencil";
import {ApiClient} from "../../api/api-client";
import {UserUpdateRequest} from "../../api/types/user-update-request";
import {faDesktop, faEnvelope, faGamepad, faKey} from "@fortawesome/free-solid-svg-icons";
import {ExtendedUser} from "../../api/types/extended-user";

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
})
export class SettingsComponent implements OnInit {
  descriptionId: string = "settings-description";
  emailId: string = "settings-email";

  allowIpId: string = "settings-allow-ip";
  allowPsnId: string = "settings-allow-psn";
  allowRpcnId: string = "settings-allow-rpcn";

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

  updateInputs(data: ExtendedUser | undefined) {
    const descriptionInput: HTMLInputElement = (<HTMLInputElement>document.getElementById(this.descriptionId));
    const emailInput: HTMLInputElement = (<HTMLInputElement>document.getElementById(this.emailId));
    descriptionInput.value = data?.description ?? "";
    emailInput.value = data?.emailAddress ?? "";

    const allowIpInput: HTMLInputElement = (<HTMLInputElement>document.getElementById(this.allowIpId));
    const allowPsnInput: HTMLInputElement = (<HTMLInputElement>document.getElementById(this.allowPsnId));
    const allowRpcnInput: HTMLInputElement = (<HTMLInputElement>document.getElementById(this.allowRpcnId));

    allowIpInput.checked = data?.allowIpAuthentication ?? false;
    allowPsnInput.checked = data?.psnAuthenticationAllowed ?? false;
    allowRpcnInput.checked = data?.rpcnAuthenticationAllowed ?? false;
  }

  saveChanges() {
    const descriptionInput: HTMLInputElement = (<HTMLInputElement>document.getElementById(this.descriptionId));
    const emailInput: HTMLInputElement = (<HTMLInputElement>document.getElementById(this.emailId));

    const allowIpInput: HTMLInputElement = (<HTMLInputElement>document.getElementById(this.allowIpId));
    const allowPsnInput: HTMLInputElement = (<HTMLInputElement>document.getElementById(this.allowPsnId));
    const allowRpcnInput: HTMLInputElement = (<HTMLInputElement>document.getElementById(this.allowRpcnId));

    let request: UserUpdateRequest = {
      description: descriptionInput.value,
      allowIpAuthentication: allowIpInput.checked,

      psnAuthenticationAllowed: allowPsnInput.checked,
      rpcnAuthenticationAllowed: allowRpcnInput.checked,
      emailAddress: emailInput.value,
    };

    this.apiClient.UpdateUser(request);
  }

  protected readonly faDesktop = faDesktop;
  protected readonly faGamepad = faGamepad;
  protected readonly faEnvelope = faEnvelope;
}
