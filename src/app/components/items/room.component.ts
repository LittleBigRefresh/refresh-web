import {Component, Input} from '@angular/core';
import {Room} from "../../api/types/rooms/room";
import {ContainerComponent} from "../ui/container.component";
import {NgForOf} from "@angular/common";
import {GamePipe} from "../../pipes/game.pipe";
import {PluralPipe} from "../../pipes/plural.pipe";

@Component({
  selector: 'app-room',
  standalone: true,
  imports: [
    ContainerComponent,
    NgForOf,
    GamePipe,
    PluralPipe
  ],
  template: `
    <app-container>
      <b>{{'player' | plural: room.playerIds.length}} on {{room.game | game}}</b>
      <ul class="list-disc">
        <div *ngFor="let player of room.playerIds">
          <li>
            {{player.username}}
          </li>
        </div>
      </ul>
    </app-container>
  `
})
export class RoomComponent {
  @Input({required: true}) room: Room = undefined!;
}
