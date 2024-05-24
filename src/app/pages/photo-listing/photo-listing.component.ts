import { Component } from '@angular/core';
import {PageTitleComponent} from "../../components/ui/text/page-title.component";
import {ClientService} from "../../api/client.service";
import {Photo} from "../../api/types/photos/photo";
import {Scrollable} from "../../helpers/scrollable";
import {defaultListInfo, RefreshApiListInfo} from "../../api/refresh-api-list-info";
import {ContainerComponent} from "../../components/ui/container.component";
import {InfiniteScrollerComponent} from "../../components/ui/infinite-scroller.component";
import {LevelPreviewComponent} from "../../components/items/level-preview.component";
import {NgForOf, NgIf} from "@angular/common";
import {ResponsiveGridComponent} from "../../components/ui/responsive-grid.component";
import {PhotoComponent} from "../../components/items/photo.component";

@Component({
  selector: 'app-photo-listing',
  standalone: true,
  imports: [
    PageTitleComponent,
    ContainerComponent,
    InfiniteScrollerComponent,
    LevelPreviewComponent,
    NgForOf,
    NgIf,
    ResponsiveGridComponent,
    PhotoComponent
  ],
  templateUrl: './photo-listing.component.html',
  styles: ``
})
export class PhotoListingComponent implements Scrollable {
  protected photos: Photo[] = [];

  constructor(private client: ClientService) {

  }

  isLoading: boolean = false;
  listInfo: RefreshApiListInfo = defaultListInfo;

  loadData(): void {
    this.isLoading = true;
    this.client.getPhotos(this.listInfo.nextPageIndex).subscribe(list => {
      this.isLoading = false;

      this.photos = this.photos.concat(list.data);
      this.listInfo = list.listInfo;
    });
  }
}
