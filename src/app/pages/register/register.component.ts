import { Component } from '@angular/core';
import {ApiClient} from "../../api/api-client";
import {sha512Async} from "../../hash";
import {Banner} from "../../banners/banner";
import {BannerService} from "../../banners/banner.service";
import {PasswordVerificationService} from "../../api/password-verification.service";

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html'
})
export class RegisterComponent {
  usernameId: string = "register-username";
  passwordId: string = "register-password";
  confirmPasswordId: string = "register-confirm-password";

  constructor(private apiClient: ApiClient, private passwordVerifier: PasswordVerificationService) {}

  register() {
    const usernameInput: string = (<HTMLInputElement>document.getElementById(this.usernameId)).value;
    const passwordInput: string = (<HTMLInputElement>document.getElementById(this.passwordId)).value;
    const confirmPasswordInput: string = (<HTMLInputElement>document.getElementById(this.confirmPasswordId)).value;

    if(!this.passwordVerifier.verifyPassword(usernameInput, passwordInput, confirmPasswordInput)) {
      return;
    }

    sha512Async(passwordInput).then((hash) => {
      this.apiClient.Register(usernameInput, hash)
    });
  }
}
