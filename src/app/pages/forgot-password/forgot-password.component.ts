import {Component, OnInit} from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ApiClient } from 'src/app/api/api-client';
import { sha512Async } from 'src/app/hash';
import { Banner } from 'src/app/banners/banner';
import { BannerService } from 'src/app/banners/banner.service';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html'
})
export class ForgotPasswordComponent implements OnInit {
  usernameId: string = "forgot-username"
  passwordId: string = "forgot-password"
  confirmPasswordId: string = "forgot-password-confirm"

  usernameParam: string | undefined = undefined;

  constructor(private apiClient: ApiClient, private route: ActivatedRoute, private bannerService: BannerService) {}

  ngOnInit() {
    this.route.queryParams.subscribe((params) => {
      this.usernameParam = params['username'];
    })
  }

  reset(): void {
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
      this.apiClient.ResetPassword(usernameInput, hash, true)
    })
  }
}
