import { Component } from '@angular/core';
import {Photo} from "../../api/types/photos/photo";
import {PhotoComponent} from "../../components/items/photo.component";
import {NgIf} from "@angular/common";
import {ClientService} from "../../api/client.service";
import {ActivatedRoute} from "@angular/router";
import {TitleService} from "../../services/title.service";

@Component({
  selector: 'app-photo-page',
  standalone: true,
  imports: [
    PhotoComponent,
    NgIf,
  ],
  templateUrl: './photo-page.component.html'
})
export class PhotoPageComponent {
  protected photo: Photo | undefined | null = undefined;

  constructor(private client: ClientService, private title: TitleService, route: ActivatedRoute) {
    route.params.subscribe(params => {
      const id: number = +params['id'];
      this.client.getPhotoById(id).subscribe(data => this.setDataFromPhoto(data));
    });
  }

  private setDataFromPhoto(data: Photo) {
    this.photo = data;

    let title = `Photo by ${data.publisher.username}`;

    const subjects = data.subjects.filter(s => s.user?.userId !== data.publisher.userId).length;
    if(subjects > 0) {
      title += ` and ${subjects} other${subjects == 1 ? '' : 's'}`;
    }

    if(data.level != null) {
      title = title.replace("Photo by ", "");
      title += ` in ${data.level.title}`
    }

    this.title.setTitle(title);
  }
}
