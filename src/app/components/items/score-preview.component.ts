import {Component, Input} from '@angular/core';

import { Score } from '../../api/types/levels/score';
import {UserLinkComponent} from "../ui/text/links/user-link.component";
import {DateComponent} from "../ui/info/date.component";
import {ScoreRouterLinkComponent} from "../ui/text/links/score-router-link.component";
import {DecimalPipe, NgClass} from "@angular/common";
import {AuthenticationService} from "../../api/authentication.service";

@Component({
    selector: 'app-score-preview',
    imports: [
    UserLinkComponent,
    DateComponent,
    ScoreRouterLinkComponent,
    DecimalPipe,
    NgClass
],
    template: `
    <div class="my-5 px-2.5 flex items-center">
      <app-score-router-link [score]="score" class="text-2xl mr-2 min-w-8">
        <span [ngClass]="rankStyle" class="transition-colors">#{{ score.rank }}</span>
      </app-score-router-link>
      <div class="flex flex-col">
        <app-score-router-link class="text-lg" [score]="score">{{ score.score | number }} points</app-score-router-link>
        <span class="text-sm">
          Achieved by
          <app-user-link [user]="score.players[0]" class="font-bold"></app-user-link>
          <app-date [date]="score.scoreSubmitted" class="ml-1"></app-date>
        </span>
      </div>
    </div>
  `
})
export class ScorePreviewComponent {
  @Input({required: true}) score: Score = null!;
  
  private ownUserId: string | undefined;

  constructor(private auth: AuthenticationService) {
    auth.user.subscribe(user => {
      this.ownUserId = user?.userId;
    })
  }
  
  get rankStyle(): string {
    switch (this.score.rank) {
      case 1:
        return "text-rank-gold font-bold";
      case 2:
        return "text-rank-silver font-bold";
      case 3:
        return "text-rank-bronze font-bold";
      default:
        if(this.score.players[0].userId == this.ownUserId)
          return "text-rank-own font-medium";
        return "text-rank-other";
    }
  }
}
