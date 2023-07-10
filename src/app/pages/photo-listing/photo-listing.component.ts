import {Component, OnInit} from '@angular/core';
import { ApiClient } from 'src/app/api/api-client';
import { Photo } from 'src/app/api/types/photo';
import {NgxMasonryOptions} from "ngx-masonry";
import {GenerateEmptyList, masonryOptions} from "../../app.component";

@Component({
  selector: 'app-photos',
  templateUrl: './photo-listing.component.html'
})
export class PhotoListingComponent implements OnInit {
  photos: Photo[] | undefined = undefined;

  constructor(private apiClient: ApiClient) {}

  ngOnInit(): void {
    this.apiClient.GetRecentPhotos().subscribe((data) => {
      this.photos = data.items;
    })
  }

  protected readonly masonryOptions = masonryOptions;
  protected readonly undefined = undefined;
  protected readonly GenerateEmptyList = GenerateEmptyList;
}
