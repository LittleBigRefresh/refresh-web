import {Component, Input, ChangeDetectionStrategy} from '@angular/core';
import {RouterLink} from "@angular/router";
import {Level} from "../../../../api/types/levels/level";
import {SlugPipe} from "../../../../pipes/slug.pipe";

// A simple link to a level.
@Component({
    selector: 'app-level-router-link',
    imports: [
        RouterLink,
        SlugPipe
    ],
    changeDetection: ChangeDetectionStrategy.Eager,
    template: `
    <a routerLink="/level/{{level.levelId}}/{{level.title | slug}}" class="hover:underline">
      <ng-content></ng-content>
    </a>
  `
})
export class LevelRouterLinkComponent {
  @Input({required: true}) public level: Level = undefined!;
}
