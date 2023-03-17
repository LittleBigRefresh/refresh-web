import { Component } from '@angular/core';
import { ApiClient } from 'src/app/api/api-client';

@Component({
  selector: 'app-logout',
  templateUrl: './logout.component.html'
})
export class LogoutComponent {
  constructor(public apiClient: ApiClient) {}
}
