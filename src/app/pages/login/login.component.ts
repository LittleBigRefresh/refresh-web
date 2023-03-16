import { Component } from '@angular/core';
import { ApiClient } from 'src/app/api/api-client';
import { sha512Async } from 'src/app/hash';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html'
})
export class LoginComponent {
  usernameId: string = "login-username"
  passwordId: string = "login-password"

  constructor(private apiClient: ApiClient) {}

  login() {
    const usernameInput: string = (<HTMLInputElement>document.getElementById(this.usernameId)).value;
    const passwordInput: string = (<HTMLInputElement>document.getElementById(this.passwordId)).value;
    
    sha512Async(passwordInput).then((hash) => {
      this.apiClient.LogIn(usernameInput, hash)
    });
  }
}
