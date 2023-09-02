import { Component } from '@angular/core';
import {ApiClient} from "../../api/api-client";
import {sha512Async} from "../../hash";
import {Banner} from "../../banners/banner";
import {BannerService} from "../../banners/banner.service";
import {PasswordVerificationService} from "../../api/password-verification.service";
import {faEnvelope, faTriangleExclamation} from "@fortawesome/free-solid-svg-icons";

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html'
})
export class RegisterComponent {
  username: string = "";
  email: string = "";
  password: string = "";
  confirmPassword: string = "";

  constructor(private apiClient: ApiClient, private passwordVerifier: PasswordVerificationService) {}

  register() {

    if(!this.passwordVerifier.verifyPassword(this.username, this.password, this.username, this.confirmPassword)) {
      return;
    }

    sha512Async(this.password).then((hash) => {
      this.apiClient.Register(this.username, this.email, hash)
    });
  }

  protected readonly faEnvelope = faEnvelope;
  protected readonly faTriangleExclamation = faTriangleExclamation;
}
