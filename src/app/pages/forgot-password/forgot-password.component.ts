import {Component, OnInit} from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ApiClient } from 'src/app/api/api-client';
import { sha512Async } from 'src/app/hash';
import { Banner } from 'src/app/banners/banner';
import { BannerService } from 'src/app/banners/banner.service';
import {PasswordVerificationService} from "../../services/password-verification.service";
import {faCancel, faEnvelope, faKey} from "@fortawesome/free-solid-svg-icons";

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html'
})
export class ForgotPasswordComponent implements OnInit {
  email: string = ""
  password: string = ""
  confirmPassword: string = ""

  constructor(private apiClient: ApiClient, private route: ActivatedRoute, private passwordVerifier: PasswordVerificationService) {}

  ngOnInit() {
    this.route.queryParams.subscribe((params) => {
      const emailParam: string | undefined = params['email'];
      if(emailParam) this.email = emailParam;
    })
  }

  reset(): void {
    if(!this.passwordVerifier.verifyPassword(this.email, this.password, undefined, this.confirmPassword)) {
      return;
    }

    sha512Async(this.password).then((hash) => {
      this.apiClient.ResetPassword(this.email, hash, this.apiClient.user == undefined)
    })
  }

  protected readonly faEnvelope = faEnvelope;
  protected readonly faKey = faKey;
  protected readonly faCancel = faCancel;
}
