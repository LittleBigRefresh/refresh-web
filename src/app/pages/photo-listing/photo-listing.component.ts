import {Component, OnInit} from '@angular/core';
import { ApiClient } from 'src/app/api/api-client';
import { Photo } from 'src/app/api/types/photo';
import {NgxMasonryOptions} from "ngx-masonry";

@Component({
  selector: 'app-photos',
  templateUrl: './photo-listing.component.html'
})
export class PhotoListingComponent implements OnInit {
  photos: Photo[] | undefined;

  masonryOptions: NgxMasonryOptions = {
    resize: true,
    animations: {},
    horizontalOrder: true,
  };

  constructor(private apiClient: ApiClient) {}

  ngOnInit(): void {
    this.apiClient.GetRecentPhotos().subscribe((data) => {
      this.photos = data;
    })
  }
}
