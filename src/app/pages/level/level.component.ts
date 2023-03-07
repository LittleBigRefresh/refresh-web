import { HttpErrorResponse } from '@angular/common/http';
import { Component } from '@angular/core';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import * as moment from 'moment';
import { catchError, of } from 'rxjs';
import { ApiClient } from 'src/app/api/api-client';
import { Level } from 'src/app/api/types/level';

@Component({
  selector: 'app-level',
  templateUrl: './level.component.html'
})
export class LevelComponent {
  level: Level | undefined
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
      });
    });
  }

  getMoment(timestamp: number): string {
    return moment(timestamp).fromNow();
  }
}
