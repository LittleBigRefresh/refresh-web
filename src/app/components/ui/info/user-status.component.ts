import {Component, Input} from '@angular/core';
import {Room} from "../../../api/types/rooms/room";
import {LevelLinkComponent} from "../text/links/level-link.component";

@Component({
  selector: 'app-user-status',
  standalone: true,
  imports: [
    LevelLinkComponent
  ],
  template: `
    @if(activeRoom) {
      <div class="bg-green w-2 h-2 rounded-full inline-block align-middle mr-1"></div>
      <span class="text-secondary-bright">
        Online,
        @switch (activeRoom.levelType) {
          @case (0) {
            <span>playing a story level</span>
          }
          @case(1) {
            <span>playing <app-level-link [level]="null" [levelId]="activeRoom.levelId"></app-level-link></span>
          }
          @case (2) {
            <span>on the moon</span>
          }
          @case (5) {
            <span>in the pod</span>
          }
          @default {
            <span>unhandled level type {{activeRoom.levelType}}</span>
          }
        }
      </span>
    } @else {
      <div class="bg-secondary w-2 h-2 rounded-full inline-block align-middle mr-1"></div>
      <span class="text-secondary">Offline</span>
    }
  `
})
export class UserStatusComponent {
  @Input() activeRoom: Room | undefined;
}
