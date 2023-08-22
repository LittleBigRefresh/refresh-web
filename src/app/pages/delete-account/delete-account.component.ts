import { Component } from '@angular/core';
import {ApiClient} from "../../api/api-client";
import {faEnvelope} from "@fortawesome/free-solid-svg-icons";

@Component({
  selector: 'app-delete-account',
  templateUrl: './delete-account.component.html'
})
export class DeleteAccountComponent {
  constructor(private apiClient: ApiClient) {}

  delete(): void {
    this.apiClient.DeleteAccount();
  }

  protected readonly faEnvelope = faEnvelope;
  protected readonly window = window;
}
