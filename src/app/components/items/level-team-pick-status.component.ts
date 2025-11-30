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
    <app-tooltip [text]="(short ? 'Team picked since ' : 'Since ') + this.formattedTime">
      <!-- TODO: Use "primary" once that is a declared color instead of "yellow" to prepare for themes -->
      <div class="flex flex-row gap-x-1 text-yellow">
          <fa-icon [icon]="faCircleCheck"></fa-icon>
          @if (!short) {
            <p>team picked {{this.shortTime}}</p>
          }
          
      </div>
    </app-tooltip>
  `
})
export class LevelTeamPickStatusComponent {
  @Input({required: true}) level: Level = undefined!;
  @Input() short: boolean = false;

  protected formattedTime: string = "unknown";
  protected shortTime: string = "";

  ngOnInit() {
    if (this.level.dateTeamPicked != null) {
      this.level.dateTeamPicked = new Date(this.level.dateTeamPicked);
      this.shortTime = getShortDateTime(this.level.dateTeamPicked);
      this.formattedTime = getFormattedDateTime(this.level.dateTeamPicked);
    }
  }

  protected readonly faCircleCheck = faCircleCheck;
}
