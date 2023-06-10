import {Component, OnInit} from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ApiClient } from 'src/app/api/api-client';
import { sha512Async } from 'src/app/hash';
import { Notification } from 'src/app/notifications/notification';
import { NotificationService } from 'src/app/notifications/notification-service';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html'
})
export class ForgotPasswordComponent implements OnInit {
  usernameId: string = "forgot-username"
  passwordId: string = "forgot-password"
  confirmPasswordId: string = "forgot-password-confirm"

  usernameParam: string | undefined = undefined;

  constructor(private apiClient: ApiClient, private route: ActivatedRoute, private notificationService: NotificationService) {}

  ngOnInit() {
    this.route.queryParams.subscribe((params) => {
      this.usernameParam = params['username'];
    })
  }

  reset(): void {
    const usernameInput: string = (<HTMLInputElement>document.getElementById(this.usernameId)).value;
    const passwordInput: string = (<HTMLInputElement>document.getElementById(this.passwordId)).value;
    const confirmPasswordInput: string = (<HTMLInputElement>document.getElementById(this.confirmPasswordId)).value;

    const error: Notification = {
      Color: 'red',
      Icon: 'exclamation-circle',
      Title: "Skill Issue",
      Text: "",
    }

    if(usernameInput.length <= 0) {
      error.Text = "No username was provided."
      this.notificationService.push(error)
      return;
    }

    if(passwordInput.length <= 0) {
      error.Text = "No password was provided."
      this.notificationService.push(error)
      return;
    }

    if(passwordInput != confirmPasswordInput) {
      error.Text = "The passwords do not match."
      this.notificationService.push(error)
      return;
    }

    sha512Async(passwordInput).then((hash) => {
      this.apiClient.ResetPassword(usernameInput, hash, true)
    })
  }
}
