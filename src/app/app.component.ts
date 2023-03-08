import { Component } from '@angular/core';
import { faCertificate, faHome, faSignIn } from '@fortawesome/free-solid-svg-icons';
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

  rightSideRouterLinks: HeaderLink[] = [
    new HeaderLink("Sign in", "/login", faSignIn),
  ]
}
