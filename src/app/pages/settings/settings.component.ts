import {Component, OnInit} from '@angular/core';
import {ApiClient} from "../../api/api-client.service";
import {UserUpdateRequest} from "../../api/types/user-update-request";
import {faDesktop, faEnvelope, faGamepad, faKey, faTrash, faPencil, faCamera} from "@fortawesome/free-solid-svg-icons";
import {ExtendedUser} from "../../api/types/extended-user";
import {startWith} from "rxjs";
import {AuthService} from "../../api/auth.service";

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
})
export class SettingsComponent implements OnInit {
  description: string = "";
  email: string = "";

  allowIpAuth: boolean = false;
  allowPsnAuth: boolean = false;
  allowRpcnAuth: boolean = false;
  redirectGriefReportsToPhotos: boolean = false;

  constructor(private authService: AuthService) {
  }

  ngOnInit(): void {
    this.authService.userWatcher
      .pipe(startWith(this.authService.user))
      .subscribe((data) => this.updateInputs(data));
  }

  updateInputs(data: ExtendedUser | undefined) {
    this.description = data?.description ?? "";
    this.email = data?.emailAddress ?? "";

    this.allowIpAuth = data?.allowIpAuthentication ?? false;
    this.allowPsnAuth = data?.psnAuthenticationAllowed ?? false;
    this.allowRpcnAuth = data?.rpcnAuthenticationAllowed ?? false;
    this.redirectGriefReportsToPhotos = data?.redirectGriefReportsToPhotos ?? false;
  }

  saveChanges() {
    let request: UserUpdateRequest = {
      description: this.description,
      emailAddress: this.email,

      allowIpAuthentication: this.allowIpAuth,
      psnAuthenticationAllowed: this.allowPsnAuth,
      rpcnAuthenticationAllowed: this.allowRpcnAuth,
      redirectGriefReportsToPhotos: this.redirectGriefReportsToPhotos,
    };

    this.authService.UpdateUser(request);
  }

  protected readonly faPencil = faPencil;
  protected readonly faKey = faKey;
  protected readonly faDesktop = faDesktop;
  protected readonly faGamepad = faGamepad;
  protected readonly faEnvelope = faEnvelope;
  protected readonly faTrash = faTrash;
  protected readonly faCamera = faCamera;
}
