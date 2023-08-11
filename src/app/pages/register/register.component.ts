import { Component } from '@angular/core';
import {ApiClient} from "../../api/api-client";
import {sha512Async} from "../../hash";
import {Banner} from "../../banners/banner";
import {BannerService} from "../../banners/banner.service";
import {PasswordVerificationService} from "../../api/password-verification.service";
import {faEnvelope} from "@fortawesome/free-solid-svg-icons";

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html'
})
export class RegisterComponent {
  usernameId: string = "register-username";
  emailId: string = "register-email";
  passwordId: string = "register-password";
  confirmPasswordId: string = "register-confirm-password";

  constructor(private apiClient: ApiClient, private passwordVerifier: PasswordVerificationService) {}

  register() {
    const usernameInput: string = (<HTMLInputElement>document.getElementById(this.usernameId)).value;
    const emailInput: string = (<HTMLInputElement>document.getElementById(this.emailId)).value;
    const passwordInput: string = (<HTMLInputElement>document.getElementById(this.passwordId)).value;
    const confirmPasswordInput: string = (<HTMLInputElement>document.getElementById(this.confirmPasswordId)).value;

    if(!this.passwordVerifier.verifyPassword(usernameInput, passwordInput, usernameInput, confirmPasswordInput)) {
      return;
    }

    sha512Async(passwordInput).then((hash) => {
      this.apiClient.Register(usernameInput, emailInput, hash)
    });
  }

  protected readonly faEnvelope = faEnvelope;
}
