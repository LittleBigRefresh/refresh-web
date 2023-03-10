import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ApiClient } from 'src/app/api/api-client';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html'
})
export class LoginComponent {
  usernameId: string = "login-username"
  passwordId: string = "login-password"

  constructor(private apiClient: ApiClient, private router: Router) {}

  login() {
    const usernameInput: string = (<HTMLInputElement>document.getElementById(this.usernameId)).value;
    const passwordInput: string = (<HTMLInputElement>document.getElementById(this.passwordId)).value;

    this.apiClient.LogIn(usernameInput, "")
  }
}
