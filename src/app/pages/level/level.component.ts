import { HttpErrorResponse } from '@angular/common/http';
import { Component } from '@angular/core';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import * as moment from 'dayjs';
import { catchError, of, tap } from 'rxjs';
import { ApiClient } from 'src/app/api/api-client';
import { Level } from 'src/app/api/types/level';
import { Score } from 'src/app/api/types/score';
import { DropdownOption } from 'src/app/components/form-dropdown/form-dropdown.component';

@Component({
  selector: 'app-level',
  templateUrl: './level.component.html'
})
export class LevelComponent {
  level: Level | undefined
  scores: Score[] | undefined
  scoreType: number = 1;

  scoreTypeId: string = "level-leaderboard-scoretype"

  scoreTypes: DropdownOption[] = [
    {
      Name: "1-player",
      Value: "1",
    },
    {
      Name: "2-players",
      Value: "2",
    },
    {
      Name: "3-players",
      Value: "3",
    },
    {
      Name: "4-players",
      Value: "4",
    },
  ]

  constructor(private apiClient: ApiClient, private router: Router, private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.route.paramMap.subscribe((params: ParamMap) => {
      const id = params.get('id') as number | null;
      if(id == null) return;
      this.apiClient.GetLevelById(id)
      .pipe(catchError((error: HttpErrorResponse, caught) => {
        console.warn(error)
        if (error.status === 404) {
          this.router.navigate(["/404"]);
          return of(undefined)
        }

        return caught;
      }))
      .subscribe(data => {
        this.level = data;
        if(this.level === undefined) return;

        this.getScores(this.level.LevelId).subscribe();
      });
    });
  }

  formChanged() {
    if(this.level === undefined) return;

    const scoreTypeInput: string = (<HTMLSelectElement>document.getElementById(this.scoreTypeId)).value;
    this.scoreType = Number(scoreTypeInput);
    this.getScores(this.level.LevelId).subscribe()
  }

  loadMoreScores() {
    if(this.level === undefined) return;
    if(this.scores === undefined) return;

    this.getScores(this.level.LevelId, false, this.scores.length + 1).subscribe();
  }

  getMoment(timestamp: number | Date): string {
    return moment(timestamp).fromNow();
  }

  getScores(levelId: number, clear: boolean = true, skip: number = 0) {
    return this.apiClient.GetScoresForLevel(levelId, this.scoreType, skip)
    .pipe(
      catchError((error: HttpErrorResponse, caught) => {
        console.warn(error);
        return of(undefined);
      }),
      tap((data) => {
        if(data === undefined) return;

        if(clear || this.scores == undefined) {
          this.scores = data;
        } else {
          this.scores = this.scores.concat(data);
        }
        

        let rank = 0;
        let i = 0;
        for(let score of this.scores) {
          const lastScore: Score | undefined = this.scores[i - 1];
          if(lastScore?.Score == score.Score) {
            rank -= 1;
          }
          
          rank++;
          i++;
          score.Rank = rank;
        }
      })
    );
  }
}
