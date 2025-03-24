import {Component, Input} from '@angular/core';
import {Room} from "../../api/types/rooms/room";
import {ContainerComponent} from "../ui/container.component";
import { AsyncPipe } from "@angular/common";
import {GamePipe} from "../../pipes/game.pipe";
import {PluralPipe} from "../../pipes/plural.pipe";
import {UserLinkComponent} from "../ui/text/links/user-link.component";
import {PlatformPipe} from "../../pipes/platform.pipe";

@Component({
    selector: 'app-room',
    imports: [
        ContainerComponent,
        GamePipe,
        PluralPipe,
        UserLinkComponent,
        AsyncPipe,
        PlatformPipe
    ],
    template: `
    <b>
      {{'player' | plural: room.playerIds.length}}
      @if (showGame) {
        <span>
          on {{room.game | game}}
        </span>
      }
      <span>
        via {{room.platform | platform}}
      </span>
    </b>
    <ul class="list-disc list-inside">
      @for (player of room.playerIds; track player.username) {
        <div>
          @if (!player.userId) {
            <li>
              {{player.username}}
            </li>
          }
          @if (player.userId) {
            <li>
              <app-user-link [user]="null" [userId]="player.userId"></app-user-link>
            </li>
          }
        </div>
      }
    </ul>
    `
})
export class RoomComponent {
  @Input({required: true}) room: Room = undefined!;
  @Input() showGame: boolean = true;
}
