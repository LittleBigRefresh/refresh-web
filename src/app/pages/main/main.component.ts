import { Component } from '@angular/core';
import { ApiClient } from 'src/app/api/api-client';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
})
export class MainComponent {
  constructor(public apiClient: ApiClient) {}
}
