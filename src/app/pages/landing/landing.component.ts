import { Component } from '@angular/core';
import {ContainerComponent} from "../../components/ui/container.component";
import {ResponsiveGridComponent} from "../../components/ui/responsive-grid.component";
import {DividerComponent} from "../../components/ui/divider.component";

@Component({
  selector: 'app-landing',
  standalone: true,
  imports: [
    ContainerComponent,
    ResponsiveGridComponent,
    DividerComponent
  ],
  templateUrl: './landing.component.html',
})
export class LandingComponent {

}
