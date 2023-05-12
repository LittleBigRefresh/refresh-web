import { HttpErrorResponse } from '@angular/common/http';
import { Component } from '@angular/core';
import { catchError, of } from 'rxjs';
import { ApiClient } from 'src/app/api/api-client';
import { Statistics } from 'src/app/api/types/statistics';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
})
export class MainComponent {
  statistics: Statistics | undefined

  constructor(public apiClient: ApiClient) {}

  ngOnInit(): void {
    this.apiClient.GetServerStatistics()
    .pipe(catchError((error: HttpErrorResponse, _) => {
      console.warn(error);
      return of(undefined);
    }))
    .subscribe(data => {
      this.statistics = data;
    });
  }
}
