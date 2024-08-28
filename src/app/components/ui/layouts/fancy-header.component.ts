import {Component, Input, OnDestroy} from '@angular/core';
import {ContainerHeaderComponent} from "../container-header.component";
import {DarkContainerComponent} from "../dark-container.component";
import {DateComponent} from "../info/date.component";
import {DefaultPipe} from "../../../pipes/default.pipe";
import {PageTitleComponent} from "../text/page-title.component";
import {LevelStatisticsComponent} from "../../items/level-statistics.component";
import { AsyncPipe, NgTemplateOutlet } from "@angular/common";
import {LayoutService} from "../../../services/layout.service";
import {Subscription} from "rxjs";

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
    NgTemplateOutlet,
    AsyncPipe
],
  template: `
    <ng-template #descriptionTemplate>
      <app-dark-container>
        <p>{{ description }}</p>
      </app-dark-container>
    </ng-template>
    
    <app-container-header>
      <div class="flex gap-x-5 sm:gap-x-2.5">
        <ng-content select="[avatar]"></ng-content>
        <div class="grow">
          <div class="flex flex-row sm:flex-col gap-x-1.5">
            <app-page-title [title]="title" class="text-nowrap"></app-page-title>
            <span class="align-bottom text-gentle self-center sm:self-auto text-nowrap">
              <ng-content select="[titleSubtext]"></ng-content>
            </span>
          </div>
          <ng-content select="[statistics]"></ng-content>
          @if (!(layout.isMobile | async)) {
            <ng-container *ngTemplateOutlet="descriptionTemplate"></ng-container>
          }
        </div>
      </div>
      @if (layout.isMobile | async) {
        <div class="mt-2.5">
          <ng-container *ngTemplateOutlet="descriptionTemplate"></ng-container>
        </div>
      }
    </app-container-header>
    `
})
export class FancyHeaderComponent {
  @Input({required: true}) title: string = "";
  @Input({required: true}) description: string = "";

  constructor(protected layout: LayoutService) {}
}
