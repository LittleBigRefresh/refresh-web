import {Component, Input, OnInit} from '@angular/core';
import {Level} from "../../api/types/levels/level";
import {ContainerTitleComponent} from "../ui/text/container-title.component";
import {DividerComponent} from "../ui/divider.component";
import {Score} from "../../api/types/levels/score";
import {ClientService} from "../../api/client.service";
import {ScorePreviewComponent} from "./score-preview.component";
import {NgClass} from "@angular/common";

@Component({
  selector: 'app-level-leaderboard',
  standalone: true,
    imports: [
        ContainerTitleComponent,
        DividerComponent,
        ScorePreviewComponent,
        NgClass
    ],
  template: `
    @for(score of scores; track score.scoreId; let i = $index) {
        <app-score-preview [score]="score"></app-score-preview>
    }
  `,
  styles: ``
})
export class LevelLeaderboardComponent implements OnInit {
  @Input({required: true}) public level: Level = null!;
  scores: Score[] = [];

  scoreType: string = "1";
  
  constructor(private client: ClientService) {
  }

  ngOnInit(): void {
    this.getScores();
  }

  getScores(clear: boolean = true, skip: number = 0) {
    this.client.getScoresForLevel(this.level.levelId, Number(this.scoreType), skip, 10)
        .subscribe((data) => {
          if (data === undefined) return;

          if (clear || this.scores == undefined) {
            this.scores = data.data;
          } else {
            this.scores = this.scores.concat(data.data);
          }

          let rank = 0;
          let i = 0;
          for (let score of this.scores) {
            const lastScore: Score | undefined = this.scores[i - 1];
            if (lastScore?.score == score.score) {
              rank -= 1;
            }

            rank++;
            i++;
            score.rank = rank;
          }
        });
  }
}
