import {Component, Input} from '@angular/core';
import {Score} from "../../../../api/types/levels/score";
import {RouterLink} from "@angular/router";

@Component({
  selector: 'app-score-router-link',
  standalone: true,
  imports: [
    RouterLink
  ],
  template: `
    <a [routerLink]="'/score/' + score.scoreId" class="hover:underline">
      <ng-content></ng-content>
    </a>
  `
})
export class ScoreRouterLinkComponent {
  @Input({required: true}) score: Score = null!;
}
