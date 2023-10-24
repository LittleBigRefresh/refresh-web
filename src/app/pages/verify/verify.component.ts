import {Component, OnInit} from '@angular/core';
import {faCheckCircle, faKey, faMailReply} from "@fortawesome/free-solid-svg-icons";
import {ApiClient} from "../../api/api-client.service";
import {ActivatedRoute, Params} from "@angular/router";

@Component({
  selector: 'app-verify',
  templateUrl: './verify.component.html'
})
export class VerifyComponent implements OnInit {
  code: string = "";

  constructor(private apiClient: ApiClient, private route: ActivatedRoute) {}

  public ngOnInit() {
    this.route.queryParams.subscribe((params: Params) => {
      const codeParam: string | undefined = params['code'];
      if(codeParam) this.code = codeParam;
    });
  }

  verify() {
    this.apiClient.VerifyEmail(this.code);
  }

  resend() {
    this.apiClient.ResendVerificationCode();
  }

  protected readonly faKey = faKey;
  protected readonly faCheckCircle = faCheckCircle;
  protected readonly faMailReply = faMailReply;
}
