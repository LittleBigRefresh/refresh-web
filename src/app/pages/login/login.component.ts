import { Component } from '@angular/core';
import { ApiClient } from 'src/app/api/api-client.service';
import { sha512Async } from 'src/app/hash';
import {PasswordVerificationService} from "../../services/password-verification.service";
import {faEnvelope, faKey, faQuestion, faSignIn, faUserPlus} from "@fortawesome/free-solid-svg-icons";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html'
})
export class LoginComponent {
  email: string = "";
  password: string = "";

  constructor(private apiClient: ApiClient, private passwordVerifier: PasswordVerificationService) {}

  login() {
    if(!this.passwordVerifier.verifyPassword(this.email, this.password)) {
      return;
    }

    sha512Async(this.password).then((hash) => {
      this.apiClient.LogIn(this.email, hash)
    });
  }

  protected readonly faEnvelope = faEnvelope;
  protected readonly faKey = faKey;
  protected readonly faSignIn = faSignIn;
  protected readonly faQuestion = faQuestion;
  protected readonly faUserPlus = faUserPlus;
}
