import { Component } from '@angular/core';
import {PageTitleComponent} from "../../../components/ui/text/page-title.component";
import {DividerComponent} from "../../../components/ui/divider.component";
import {ContainerComponent} from "../../../components/ui/container.component";
import {DarkContainerComponent} from "../../../components/ui/dark-container.component";
import {CodeBlockComponent} from "../../../components/ui/text/code-block.component";
import {ContainerTitleComponent} from "../../../components/ui/text/container-title.component";
import {SectionTitleComponent} from "../../../components/ui/text/section-title.component";

@Component({
  selector: 'app-text-playground',
  standalone: true,
  imports: [
    PageTitleComponent,
    DividerComponent,
    ContainerComponent,
    DarkContainerComponent,
    CodeBlockComponent,
    ContainerTitleComponent,
    SectionTitleComponent
  ],
  templateUrl: './text-playground.component.html'
})
export class TextPlaygroundComponent {

}
