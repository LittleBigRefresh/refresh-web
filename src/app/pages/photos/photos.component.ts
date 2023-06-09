import { Component } from '@angular/core';
import { ApiClient } from 'src/app/api/api-client';
import { Photo } from 'src/app/api/types/photo';

@Component({
  selector: 'app-photos',
  templateUrl: './photos.component.html'
})
export class PhotosComponent {
  photos: Photo[] | undefined;

  constructor(private apiClient: ApiClient) {}

  ngOnInit(): void {
    this.apiClient.GetRecentPhotos().subscribe((data) => {
      this.photos = data;
    })
  }

  getPhotoLink(photo: Photo): string {
    return this.apiClient.GetPhotoLink(photo, true)
  }
}
