import {Component, Input} from '@angular/core';
import {ContainerHeaderComponent} from "../container-header.component";
import {DarkContainerComponent} from "../dark-container.component";
import {DateComponent} from "../date.component";
import {DefaultPipe} from "../../../pipes/default.pipe";
import {PageTitleComponent} from "../text/page-title.component";
import {LevelStatisticsComponent} from "../../items/level-statistics.component";

@Component({
  selector: 'app-fancy-header',
  standalone: true,
  imports: [
    ContainerHeaderComponent,
    DarkContainerComponent,
    DateComponent,
    DefaultPipe,
    PageTitleComponent,
    LevelStatisticsComponent,
  ],
  template: `
    <app-container-header>
      <div class="flex gap-x-5">
        <ng-content select="[avatar]"></ng-content>
        <div class="grow">
          <div class="flex flex-row sm:flex-col gap-x-1.5">
            <app-page-title [title]="title" class="text-nowrap"></app-page-title>
            <span class="align-bottom text-gentle self-center sm:self-auto text-nowrap">
                <ng-content select="[titleSubtext]"></ng-content>
            </span>
          </div>
          <ng-content select="[statistics]"></ng-content>
          <app-dark-container>
            <p>{{description}}</p>
          </app-dark-container>
        </div>
      </div>
    </app-container-header>
  `
})
export class FancyHeaderComponent {
  @Input({required: true}) title: string = "";
  @Input({required: true}) description: string = "";

}
