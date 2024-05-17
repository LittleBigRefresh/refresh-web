import { Component } from '@angular/core';
import {ContainerComponent} from "../../components/ui/container.component";
import {ResponsiveGridComponent} from "../../components/ui/responsive-grid.component";
import {DividerComponent} from "../../components/ui/divider.component";
import {Instance} from "../../api/types/instance";
import {ClientService} from "../../api/client.service";
import {PageTitleComponent} from "../../components/ui/text/page-title.component";
import {RouterLink} from "@angular/router";
import {NgForOf, NgIf, NgOptimizedImage, SlicePipe} from "@angular/common";
import {ContainerTitleComponent} from "../../components/ui/text/container-title.component";
import {SectionTitleComponent} from "../../components/ui/text/section-title.component";
import {FaIconComponent} from "@fortawesome/angular-fontawesome";
import {faFireAlt, faGamepad, faUsers} from "@fortawesome/free-solid-svg-icons";
import {AnnouncementComponent} from "../../components/items/announcement.component";
import {Room} from "../../api/types/rooms/room";
import {RoomComponent} from "../../components/items/room.component";
import {RouterLinkComponent} from "../../components/ui/text/links/router-link.component";

@Component({
  selector: 'app-landing',
  standalone: true,
    imports: [
        ContainerComponent,
        ResponsiveGridComponent,
        DividerComponent,
        PageTitleComponent,
        RouterLink,
        NgOptimizedImage,
        ContainerTitleComponent,
        SectionTitleComponent,
        FaIconComponent,
        AnnouncementComponent,
        NgForOf,
        NgIf,
        RoomComponent,
        SlicePipe,
        RouterLinkComponent
    ],
  templateUrl: './landing.component.html',
})
export class LandingComponent {
    protected instance: Instance | undefined;
    protected rooms: Room[] | undefined;

    constructor(client: ClientService) {
      client.getInstance().subscribe(data => this.instance = data);
      client.getRoomListing().subscribe(data => this.rooms = data.data);
    }

    playerCount(): number {
        if(!this.rooms) return -1;
        let players: number = 0;

        for (let room of this.rooms) {
            players += room.playerIds.length;
        }

        return players;
    }

    protected readonly faFireAlt = faFireAlt;
    protected readonly faGamepad = faGamepad;
}
