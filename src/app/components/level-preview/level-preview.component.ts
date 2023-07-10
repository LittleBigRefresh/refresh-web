import {Component, Input} from '@angular/core';
import {Level} from "../../api/types/level";
import {GetAssetImageLink} from "../../api/api-client";
import * as moment from "dayjs";

@Component({
  selector: 'level-preview',
  templateUrl: './level-preview.component.html'
})
export class LevelPreviewComponent {
  _level: Level | undefined = undefined;
  _description : boolean = false;

  @Input()
  set level(level: Level | undefined) {
    this._level = level;
  }

  @Input()
  set description(description: boolean) {
    this._description = description;
  }

  getMoment(timestamp: number): string {
    return moment(timestamp).fromNow();
  }

  protected readonly GetAssetImageLink = GetAssetImageLink;
}
