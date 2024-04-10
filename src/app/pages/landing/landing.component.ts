import { Component } from '@angular/core';
import {ContainerComponent} from "../../components/ui/container.component";
import {ResponsiveGridComponent} from "../../components/ui/responsive-grid.component";
import {DividerComponent} from "../../components/ui/divider.component";
import {CodeBlockComponent} from "../../components/ui/code-block.component";
import {Instance} from "../../api/types/instance";
import {ClientService} from "../../api/client.service";

@Component({
  selector: 'app-landing',
  standalone: true,
  imports: [
    ContainerComponent,
    ResponsiveGridComponent,
    DividerComponent,
    CodeBlockComponent
  ],
  templateUrl: './landing.component.html',
})
export class LandingComponent {
  protected instance: Instance | undefined;

  constructor(client: ClientService) {
    client.getInstance().subscribe(data => this.instance = data);
  }

  protected readonly JSON = JSON;
}
