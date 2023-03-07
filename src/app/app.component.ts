import { Component } from '@angular/core';
import { faCertificate, faHome } from '@fortawesome/free-solid-svg-icons';
import { HeaderLink } from './header-link';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'Refresh Website';

  routerLinks: HeaderLink[] = [
    new HeaderLink("Home", "/", faHome),
    new HeaderLink("Levels", "/levels", faCertificate),
  ];
}
