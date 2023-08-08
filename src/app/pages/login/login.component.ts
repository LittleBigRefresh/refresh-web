import { Component } from '@angular/core';
import { ApiClient } from 'src/app/api/api-client';
import { sha512Async } from 'src/app/hash';
import {Banner} from "../../banners/banner";
import {BannerService} from "../../banners/banner.service";
import {PasswordVerificationService} from "../../api/password-verification.service";

let i: number = 0;

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html'
})
export class LoginComponent {
  usernameId: string = "login-username" + i++;
  passwordId: string = "login-password" + i++;

  constructor(private apiClient: ApiClient, private passwordVerifier: PasswordVerificationService) {}

  login() {
    const usernameInput: string = (<HTMLInputElement>document.getElementById(this.usernameId)).value;
    const passwordInput: string = (<HTMLInputElement>document.getElementById(this.passwordId)).value;

    if(!this.passwordVerifier.verifyPassword(usernameInput, passwordInput)) {
      return;
    }

    sha512Async(passwordInput).then((hash) => {
      this.apiClient.LogIn(usernameInput, hash)
    });
  }
}
