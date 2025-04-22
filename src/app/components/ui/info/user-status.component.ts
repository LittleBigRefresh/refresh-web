import {Component, Input} from '@angular/core';
import {Room} from "../../../api/types/rooms/room";
import {LevelLinkComponent} from "../text/links/level-link.component";
import {DateComponent} from "./date.component";

@Component({
    selector: 'app-user-status',
    imports: [
        LevelLinkComponent,
        DateComponent
    ],
    template: `
    @if(activeRoom) {
      <div class="bg-green w-2 h-2 rounded-full inline-block align-middle mr-1"></div>
      <span class="text-secondary-bright">Online,
        @switch (activeRoom.levelType) {
          @case (0) {
            <span>playing a story level</span>
          }
          @case (1) {
            <span>playing level <app-level-link [level]="null" [levelId]="activeRoom.levelId"></app-level-link></span>
          }
          @case (2) {
            <span>on the moon, creating a level</span>
          }
          @case (5) {
            <span>in the pod</span>
          }
          @case (8) {
            <span>playing a DLC level</span>
          }
          @case (11) {
            <span>playing a story adventure</span>
          }
          @case (14) {
            <span>playing adventure <app-level-link [level]="null" [levelId]="activeRoom.levelId"></app-level-link></span>
          }
          @case (15) {
            <span>on the moon, creating an adventure</span>
          }
          @default {
            <span>unhandled level type {{activeRoom.levelType}}</span>
          }
        }
      </span>
    } @else {
      <div class="bg-secondary w-2 h-2 rounded-full inline-block align-middle mr-1"></div>
      <span class="text-secondary">Offline, last seen <app-date [date]="lastSeen"></app-date></span>
    }
  `
})
export class UserStatusComponent {
  @Input({required: true}) activeRoom: Room | undefined;
  @Input({required: true}) lastSeen: Date = null!;
}
