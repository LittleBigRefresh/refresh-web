import {Component, OnInit} from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ApiClient } from 'src/app/api/api-client';
import { sha512Async } from 'src/app/hash';
import { Banner } from 'src/app/banners/banner';
import { BannerService } from 'src/app/banners/banner.service';
import {PasswordVerificationService} from "../../api/password-verification.service";

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html'
})
export class ForgotPasswordComponent implements OnInit {
  usernameId: string = "forgot-username"
  passwordId: string = "forgot-password"
  confirmPasswordId: string = "forgot-password-confirm"

  usernameParam: string | undefined = undefined;

  constructor(private apiClient: ApiClient, private route: ActivatedRoute, private passwordVerifier: PasswordVerificationService) {}

  ngOnInit() {
    this.route.queryParams.subscribe((params) => {
      this.usernameParam = params['username'];
    })
  }

  reset(): void {
    const usernameInput: string = (<HTMLInputElement>document.getElementById(this.usernameId)).value;
    const passwordInput: string = (<HTMLInputElement>document.getElementById(this.passwordId)).value;
    const confirmPasswordInput: string = (<HTMLInputElement>document.getElementById(this.confirmPasswordId)).value;

    if(!this.passwordVerifier.verifyPassword(usernameInput, passwordInput, confirmPasswordInput)) {
      return;
    }

    sha512Async(passwordInput).then((hash) => {
      this.apiClient.ResetPassword(usernameInput, hash, true)
    })
  }
}
