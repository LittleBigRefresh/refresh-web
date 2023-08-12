import {Component, OnInit} from '@angular/core';
import {faKey} from "@fortawesome/free-solid-svg-icons";
import {ApiClient} from "../../api/api-client";
import {ActivatedRoute, Params} from "@angular/router";

@Component({
  selector: 'app-verify',
  templateUrl: './verify.component.html'
})
export class VerifyComponent implements OnInit {
  protected readonly codeId: string = "verify-code";

  constructor(private apiClient: ApiClient, private route: ActivatedRoute) {}

  codeParam: string | undefined = undefined;

  public ngOnInit() {
    this.route.queryParams.subscribe((params: Params) => {
      if(params['code'] === undefined) return;
      this.codeParam = params['code'];
    })
  }

  verify() {
    const codeInput: HTMLInputElement = (<HTMLInputElement>document.getElementById(this.codeId));
    this.apiClient.VerifyEmail(codeInput.value);
  }

  resend() {
    this.apiClient.ResendVerificationCode();
  }

  protected readonly faKey = faKey;
}
