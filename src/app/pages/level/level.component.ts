import { HttpErrorResponse } from '@angular/common/http';
import { Component } from '@angular/core';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import * as moment from 'moment';
import { catchError, of, tap } from 'rxjs';
import { ApiClient } from 'src/app/api/api-client';
import { Level } from 'src/app/api/types/level';
import { Score } from 'src/app/api/types/score';

@Component({
  selector: 'app-level',
  templateUrl: './level.component.html'
})
export class LevelComponent {
  level: Level | undefined
  scores: Score[] | undefined
  scoreType: number = 1;

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

  getMoment(timestamp: moment.MomentInput): string {
    return moment(timestamp).fromNow();
  }

  getScores(levelId: number) {
    return this.apiClient.GetScoresForLevel(levelId, this.scoreType)
    .pipe(
      catchError((error: HttpErrorResponse, caught) => {
        console.warn(error);
        return of(undefined);
      }),
      tap((data) => {
        this.scores = data;
        if(this.scores === undefined) return;

        let i = 0;
        for(let score of this.scores) {
          i++;
          score.Rank = i;
        }
      })
    );
  }
}
