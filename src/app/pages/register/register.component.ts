import { Component } from '@angular/core';
import {ApiClient} from "../../api/api-client";
import {sha512Async} from "../../hash";
import {Banner} from "../../banners/banner";
import {BannerService} from "../../banners/banner.service";

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html'
})
export class RegisterComponent {
  usernameId: string = "register-username";
  passwordId: string = "register-password";
  confirmPasswordId: string = "register-confirm-password";

  constructor(private apiClient: ApiClient, private bannerService: BannerService) {}

  register() {
    const usernameInput: string = (<HTMLInputElement>document.getElementById(this.usernameId)).value;
    const passwordInput: string = (<HTMLInputElement>document.getElementById(this.passwordId)).value;
    const confirmPasswordInput: string = (<HTMLInputElement>document.getElementById(this.confirmPasswordId)).value;

    const error: Banner = {
      Color: 'red',
      Icon: 'exclamation-circle',
      Title: "Skill Issue",
      Text: "",
    }

    if(usernameInput.length <= 0) {
      error.Text = "No username was provided."
      this.bannerService.push(error)
      return;
    }

    if(passwordInput.length <= 0) {
      error.Text = "No password was provided."
      this.bannerService.push(error)
      return;
    }

    if(passwordInput != confirmPasswordInput) {
      error.Text = "The passwords do not match."
      this.bannerService.push(error)
      return;
    }

    sha512Async(passwordInput).then((hash) => {
      this.apiClient.Register(usernameInput, hash)
    });
  }
}
