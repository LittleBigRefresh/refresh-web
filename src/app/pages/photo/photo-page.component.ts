import { Component } from '@angular/core';
import {Photo} from "../../api/types/photos/photo";
import {PhotoComponent} from "../../components/items/photo.component";

import {ClientService} from "../../api/client.service";
import {ActivatedRoute} from "@angular/router";
import {EmbedService} from "../../services/embed.service";

@Component({
    selector: 'app-photo-page',
    imports: [
        PhotoComponent
    ],
    templateUrl: './photo-page.component.html'
})
export class PhotoPageComponent {
  protected photo: Photo | undefined | null = undefined;

  constructor(private client: ClientService, private embed: EmbedService, route: ActivatedRoute) {
    route.params.subscribe(params => {
      const id: number = +params['id'];
      this.client.getPhotoById(id).subscribe(data => this.setDataFromPhoto(data));
    });
  }

  private setDataFromPhoto(data: Photo) {
    this.photo = data;
    this.embed.embedPhoto(data);
  }
}
