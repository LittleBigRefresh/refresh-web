import {Component, Input} from '@angular/core';
import {RouterLink} from "@angular/router";
import { Score } from '../../api/types/levels/score';
import {UserLinkComponent} from "../ui/text/links/user-link.component";
import {DateComponent} from "../ui/info/date.component";

@Component({
  selector: 'app-score-preview',
  standalone: true,
  imports: [
    RouterLink,
    UserLinkComponent,
    DateComponent
  ],
  template: `
    <div class="my-5 px-2.5">
      <a [routerLink]="'/score/' + score.scoreId" class="flex items-center">
        <div class="text-2xl mr-2">
          @switch (score.rank) {
            @case(1) {
              <span class="text-rank-gold">#{{ score.rank }}</span>
            }
            @case(2) {
              <span class="text-rank-silver">#{{ score.rank }}</span>
            }
            @case(3) {
              <span class="text-rank-bronze">#{{ score.rank }}</span>
            }
            @default() {
              <span class="text-rank-other">#{{ score.rank }}</span>
            }
          }
        </div>

        <div class="flex flex-col">
          <span class="text-lg">{{ score.score.toLocaleString(undefined) }} points</span>
          <span class="text-sm">
              Achieved by
              <b><app-user-link [user]="score.players[0]"></app-user-link></b>
              <app-date [date]="score.scoreSubmitted"></app-date>
            </span>
        </div>
      </a>
    </div>
  `
})
export class ScorePreviewComponent {
  @Input({required: true}) score: Score = null!;
}
