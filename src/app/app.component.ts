import {Component, OnInit} from '@angular/core';
import { RouterOutlet } from '@angular/router';
import {HeaderComponent} from "./components/ui/header/header.component";
import {TitleService} from "./services/title.service";
import {EmbedService} from "./services/embed.service";
import {FaIconLibrary} from "@fortawesome/angular-fontawesome";
import {fas} from "@fortawesome/free-solid-svg-icons";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, HeaderComponent],
  templateUrl: './app.component.html'
})
export class AppComponent {
  constructor(private title: TitleService,
              private embed: EmbedService,
              library: FaIconLibrary) {
    library.addIconPacks(fas)
  }
}
