import { Component } from '@angular/core';
import { ApiClient } from 'src/app/api/api-client';
import { sha512Async } from 'src/app/hash';
import {PasswordVerificationService} from "../../api/password-verification.service";
import {faEnvelope} from "@fortawesome/free-solid-svg-icons";

let i: number = 0;

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html'
})
export class LoginComponent {
  emailId: string = "login-email" + i++;
  passwordId: string = "login-password" + i++;

  constructor(private apiClient: ApiClient, private passwordVerifier: PasswordVerificationService) {}

  login() {
    const emailInput: string = (<HTMLInputElement>document.getElementById(this.emailId)).value;
    const passwordInput: string = (<HTMLInputElement>document.getElementById(this.passwordId)).value;

    if(!this.passwordVerifier.verifyPassword(emailInput, passwordInput)) {
      return;
    }

    sha512Async(passwordInput).then((hash) => {
      this.apiClient.LogIn(emailInput, hash)
    });
  }

  protected readonly faEnvelope = faEnvelope;
}
