import { Component } from '@angular/core';
import { faCertificate, faHome, faSignIn, faUser } from '@fortawesome/free-solid-svg-icons';
import { ApiClient } from './api/api-client';
import { User } from './api/types/user';
import { HeaderLink } from './header-link';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html'
})
export class AppComponent {
  title = 'Refresh Website';

  routerLinks: HeaderLink[] = [
    new HeaderLink("Home", "/", faHome),
    new HeaderLink("Levels", "/levels", faCertificate),
  ];

  rightSideRouterLinks: HeaderLink[] = []

  constructor(apiClient: ApiClient) {
    apiClient.userWatcher.subscribe((data) => this.handleUserUpdate(data))
    this.handleUserUpdate(undefined)
  }

  handleUserUpdate(data: User | undefined) {
    this.rightSideRouterLinks = [];

    if (data !== undefined) {
      this.rightSideRouterLinks.push(new HeaderLink(data.Username, "/user/me", faUser))
    } else {
      this.rightSideRouterLinks.push(new HeaderLink("Sign in", "/login", faSignIn))
    }
  }
}
