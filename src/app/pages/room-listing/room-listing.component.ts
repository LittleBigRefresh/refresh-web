import {ChangeDetectorRef, Component, inject, Inject, NgZone, OnDestroy, PLATFORM_ID} from '@angular/core';
import {PageTitleComponent} from "../../components/ui/text/page-title.component";
import {RoomComponent} from "../../components/items/room.component";

import {Room} from "../../api/types/rooms/room";
import {ClientService} from "../../api/client.service";
import {GameVersion} from "../../api/types/game-version";
import {ContainerComponent} from "../../components/ui/container.component";
import {ContainerTitleComponent} from "../../components/ui/text/container-title.component";
import {GamePipe} from "../../pipes/game.pipe";
import {DarkContainerComponent} from "../../components/ui/dark-container.component";
import {PluralPipe} from "../../pipes/plural.pipe";
import {repeat, Subscription} from "rxjs";
import {isPlatformBrowser} from "@angular/common";

@Component({
    selector: 'app-room-listing',
    imports: [
        PageTitleComponent,
        RoomComponent,
        ContainerComponent,
        ContainerTitleComponent,
        GamePipe,
        DarkContainerComponent,
        PluralPipe
    ],
    templateUrl: './room-listing.component.html'
})
export class RoomListingComponent implements OnDestroy {
  protected rooms: Room[] = [];

  private roomsSubscription: Subscription | undefined;

  constructor(private client: ClientService, @Inject(PLATFORM_ID) platformId: Object, changeDetector: ChangeDetectorRef) {
    client.getRoomListing().subscribe(rooms => {
      this.rooms = rooms.data;
    })

    if(isPlatformBrowser(platformId)) {
      inject(NgZone).runOutsideAngular(() => {
        this.roomsSubscription = this.fetchRooms()
            .pipe(repeat({delay: 5000}))
            .subscribe(data => {
              this.rooms = data.data;
              changeDetector.detectChanges();
            });
      })
    }
  }

  ngOnDestroy(): void {
    this.roomsSubscription?.unsubscribe();
  }

  fetchRooms() {
    return this.client.getRoomListing();
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
