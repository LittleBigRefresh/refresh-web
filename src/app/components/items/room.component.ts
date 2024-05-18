import {Component, Input} from '@angular/core';
import {Room} from "../../api/types/rooms/room";
import {ContainerComponent} from "../ui/container.component";
import {AsyncPipe, NgForOf, NgIf} from "@angular/common";
import {GamePipe} from "../../pipes/game.pipe";
import {PluralPipe} from "../../pipes/plural.pipe";
import {UserLinkComponent} from "../ui/text/links/user-link.component";

@Component({
  selector: 'app-room',
  standalone: true,
  imports: [
    ContainerComponent,
    NgForOf,
    GamePipe,
    PluralPipe,
    NgIf,
    UserLinkComponent,
    AsyncPipe
  ],
  template: `
    <app-container>
      <b>{{'player' | plural: room.playerIds.length}} on {{room.game | game}}</b>
      <ul class="list-disc list-inside">
        <div *ngFor="let player of room.playerIds">
          <li *ngIf="!player.userId">
            {{player.username}}
          </li>
          <li *ngIf="player.userId">
            <app-user-link [user]="null" [userId]="player.userId"></app-user-link>
          </li>
        </div>
      </ul>
    </app-container>
  `
})
export class RoomComponent {
  @Input({required: true}) room: Room = undefined!;
}