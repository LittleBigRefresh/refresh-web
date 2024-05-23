import { Component } from '@angular/core';
import {PageTitleComponent} from "../../components/ui/text/page-title.component";
import {RoomComponent} from "../../components/items/room.component";
import {NgForOf, NgIf} from "@angular/common";
import {Room} from "../../api/types/rooms/room";
import {ClientService} from "../../api/client.service";
import {GameVersion} from "../../api/types/game-version";
import {ContainerComponent} from "../../components/ui/container.component";
import {ContainerTitleComponent} from "../../components/ui/text/container-title.component";
import {GamePipe} from "../../pipes/game.pipe";
import {DarkContainerComponent} from "../../components/ui/dark-container.component";
import {PluralPipe} from "../../pipes/plural.pipe";

@Component({
  selector: 'app-room-listing',
  standalone: true,
  imports: [
    PageTitleComponent,
    RoomComponent,
    NgForOf,
    ContainerComponent,
    ContainerTitleComponent,
    GamePipe,
    DarkContainerComponent,
    PluralPipe,
    NgIf,
  ],
  templateUrl: './room-listing.component.html'
})
export class RoomListingComponent {
  rooms: Room[] = [];

  constructor(client: ClientService) {
    client.getRoomListing().subscribe(rooms => {
      this.rooms = rooms.data;
    })
  }

  playerCount(): number {
    if(!this.rooms) return -1;
    let players: number = 0;

    for (let room of this.rooms) {
      players += room.playerIds.length;
    }

    return players;
  }

  // moronic hack to iterate through the values of an enum
  // i hate javascript i hate javascript i hate javascript i hate javascript
  // i hate javascript i hate javascript i hate javascript i hate javascript
  // i hate javascript i hate javascript i hate javascript i hate javascript
  // i hate javascript i hate javascript i hate javascript i hate javascript
  getGameVersions(): number[] {
    return Object.values(GameVersion)
        // @ts-ignore
        .filter(key => isNaN(Number(GameVersion[key])) && key != 5)
        .map(k => Number(k));
  }

  getRoomsForGame(game: GameVersion) {
    return this.rooms.filter(r => r.game == game)
  }
}
