import { Component } from '@angular/core';
import { ApiClient } from 'src/app/api/api-client.service';
import {AuthService} from "../../api/auth.service";

@Component({
  selector: 'app-logout',
  templateUrl: './logout.component.html'
})
export class LogoutComponent {
  constructor(public authService: AuthService) {}
}
