import {Component, OnInit} from '@angular/core';
import { RouterOutlet } from '@angular/router';
import {ContainerComponent} from "./components/ui/container.component";
import {DividerComponent} from "./components/ui/divider.component";
import {ResponsiveGridComponent} from "./components/ui/responsive-grid.component";
import {HeaderComponent} from "./components/ui/header/header.component";
import {FontAwesomeModule} from "@fortawesome/angular-fontawesome";
import {TitleService} from "./services/title.service";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, HeaderComponent],
  templateUrl: './app.component.html'
})
export class AppComponent implements OnInit {
  constructor(private title: TitleService) {
  }

  ngOnInit(): void {
      this.title.setTitle("");
  }
}
