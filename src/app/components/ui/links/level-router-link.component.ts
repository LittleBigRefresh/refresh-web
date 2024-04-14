import {Component, Input} from '@angular/core';
import {RouterLink} from "@angular/router";
import {Level} from "../../../api/types/levels/level";

// A simple link to a level.
// In the future, this will support slugs.
@Component({
  selector: 'app-level-router-link',
  standalone: true,
  imports: [
    RouterLink
  ],
  template: `
    <a routerLink="/level/{{level.levelId}}">
      <ng-content></ng-content>
    </a>
  `
})
export class LevelRouterLinkComponent {
  @Input({required: true}) public level: Level = undefined!;
}
