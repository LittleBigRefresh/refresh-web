import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { EMPTY, catchError, of, switchMap } from 'rxjs';
import { ApiClient } from 'src/app/api/api-client';
import { Photo } from 'src/app/api/types/photo';

@Component({
  selector: 'app-photo',
  templateUrl: './photo.component.html'
})
export class PhotoComponent implements OnInit {
  photo: Photo | undefined | null = null

  constructor(private apiClient: ApiClient, private route: ActivatedRoute) {}

  ngOnInit(): void {
    this.route.paramMap.pipe(switchMap((params: ParamMap) => {
      const id = Number(params.get("id")) as number | undefined;
      if(id === undefined) {
        return EMPTY;
      }

      return this.apiClient.GetPhotoById(id);
    }))
    .pipe(catchError(() => {
      return of(undefined);
    }))
    .subscribe((data) => {
      this.photo = data;
    });
  }

  getPhotoLink(): string {
    if(!this.photo) return "";
    return this.apiClient.GetPhotoLink(this.photo, true)
  }
}
