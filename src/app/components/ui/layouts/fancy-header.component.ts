import {Component, Input} from '@angular/core';
import {ContainerHeaderComponent} from "../container-header.component";
import {DarkContainerComponent} from "../dark-container.component";
import {PageTitleComponent} from "../text/page-title.component";
import { NgTemplateOutlet } from "@angular/common";

@Component({
    selector: 'app-fancy-header',
    imports: [
        ContainerHeaderComponent,
        DarkContainerComponent,
        PageTitleComponent,
        NgTemplateOutlet
    ],
    template: `
    <ng-template #descriptionTemplate>
      <app-dark-container>
        <p>{{ description }}</p>
      </app-dark-container>
    </ng-template>

    <app-container-header>
      <div class="flex gap-x-2 sm:gap-x-2.5">
        <ng-content select="[avatar]"></ng-content>
        <div class="grow content-evenly">
          <div class="flex flex-row place-content-between sm:flex-col gap-x-1.5 relative">
            <app-page-title [title]="title" class="text-wrap [word-break:break-word]">
              <ng-container titleSubtext>
                <span class="align-bottom text-gentle text-base text-wrap font-normal self-center sm:self-auto">
                  <ng-content select="[titleSubtext]"></ng-content>
                </span>
              </ng-container>
            </app-page-title>
            <ng-content select="[buttonArea]"></ng-content>
          </div>
          <div class="flex flex-row gap-x-1 justify-between">
            <div>
              <ng-content select="[belowTitle]"></ng-content>
              <ng-content select="[statistics]"></ng-content>
              <ng-content select="[belowStatistics]"></ng-content>
            </div>
            <div>
              <ng-content select="[belowTitleRight]"></ng-content>
            </div>
          </div>
        </div>
      </div>
      <div class="mt-2.5">
        <ng-container *ngTemplateOutlet="descriptionTemplate"></ng-container>
      </div>
      <div class="mt-2.5">
        <ng-content select="[buttonAreaMobile]"></ng-content>
      </div>
    </app-container-header>
    `
})
export class FancyHeaderComponent {
  @Input({required: true}) title: string = "";
  @Input({required: true}) description: string = "";
}
