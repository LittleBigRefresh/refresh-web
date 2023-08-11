import {Component, OnInit} from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ApiClient } from 'src/app/api/api-client';
import { sha512Async } from 'src/app/hash';
import { Banner } from 'src/app/banners/banner';
import { BannerService } from 'src/app/banners/banner.service';
import {PasswordVerificationService} from "../../api/password-verification.service";
import {faEnvelope} from "@fortawesome/free-solid-svg-icons";

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html'
})
export class ForgotPasswordComponent implements OnInit {
  emailId: string = "forgot-email"
  passwordId: string = "forgot-password"
  confirmPasswordId: string = "forgot-password-confirm"

  emailParam: string | undefined = undefined;

  constructor(private apiClient: ApiClient, private route: ActivatedRoute, private passwordVerifier: PasswordVerificationService) {}

  ngOnInit() {
    this.route.queryParams.subscribe((params) => {
      this.emailParam = params['email'];
    })
  }

  reset(): void {
    const emailInput: string = (<HTMLInputElement>document.getElementById(this.emailId)).value;
    const passwordInput: string = (<HTMLInputElement>document.getElementById(this.passwordId)).value;
    const confirmPasswordInput: string = (<HTMLInputElement>document.getElementById(this.confirmPasswordId)).value;

    if(!this.passwordVerifier.verifyPassword(emailInput, passwordInput, undefined, confirmPasswordInput)) {
      return;
    }

    sha512Async(passwordInput).then((hash) => {
      this.apiClient.ResetPassword(emailInput, hash, true)
    })
  }

  protected readonly faEnvelope = faEnvelope;
}
