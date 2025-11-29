import {Component, Input} from '@angular/core';
import {Level} from "../../api/types/levels/level";
import {faCircleCheck} from "@fortawesome/free-solid-svg-icons";
import { FaIconComponent } from "@fortawesome/angular-fontawesome";
import { TooltipComponent } from "../ui/text/tooltip.component";
import { getFormattedDateTime, getShortDateTime } from '../../helpers/date-time';

@Component({
    selector: 'app-level-team-pick-status',
    imports: [
    FaIconComponent,
    TooltipComponent
],
    template: `
    <app-tooltip [text]="'Team picked since ' + this.getFormattedDateTime()">
        <div class="flex flex-row gap-x-1">
            <fa-icon [icon]="faCircleCheck"></fa-icon>
            <p> {{this.getShortDateTime()}}</p>
        </div>
    </app-tooltip>
  `
})
export class LevelTeamPickStatusComponent {
  @Input({required: true}) level: Level = undefined!;

  ngOnInit() {
    if (this.level.dateTeamPicked != null) {
      this.level.dateTeamPicked = new Date(this.level.dateTeamPicked);
    }
  }

  protected getFormattedDateTime(): string {
    if (this.level.dateTeamPicked == null) return "unknown";

    return getFormattedDateTime(this.level.dateTeamPicked);
  }

  protected getShortDateTime(): string {
    if (this.level.dateTeamPicked == null) return "";

    return getShortDateTime(this.level.dateTeamPicked);
  }

  protected readonly faCircleCheck = faCircleCheck;
}
