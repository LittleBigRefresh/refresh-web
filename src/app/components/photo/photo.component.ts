import {Component, Input} from '@angular/core';
import {Photo} from "../../api/types/photo";
import {ApiClient} from "../../api/api-client";

@Component({
  selector: 'photo',
  templateUrl: './photo.component.html'
})
export class PhotoComponent {
  _photo: Photo = null!;
  _link: boolean = true;

  @Input()
  set photo(param: Photo) {
    this._photo = param;
  }

  @Input()
  set link(param: boolean) {
    this._link = param;
  }

  constructor(private apiClient: ApiClient) {}

  getPhotoLink(): string {
    return this.apiClient.GetPhotoLink(this._photo, true)
  }
}
