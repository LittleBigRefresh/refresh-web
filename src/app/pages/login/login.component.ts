import { Component } from '@angular/core';
import { ApiClient } from 'src/app/api/api-client';
import { sha512Async } from 'src/app/hash';

let i: number = 0;

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html'
})
export class LoginComponent {
  usernameId: string = "login-username" + i++;
  passwordId: string = "login-password" + i++;

  constructor(private apiClient: ApiClient) {}

  login() {
    const usernameInput: string = (<HTMLInputElement>document.getElementById(this.usernameId)).value;
    const passwordInput: string = (<HTMLInputElement>document.getElementById(this.passwordId)).value;

    sha512Async(passwordInput).then((hash) => {
      this.apiClient.LogIn(usernameInput, hash)
    });
  }
}
