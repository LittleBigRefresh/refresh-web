import {
    AfterViewInit,
    ChangeDetectorRef,
    Component,
    inject,
    Inject,
    NgZone,
    OnDestroy,
    OnInit,
    PLATFORM_ID
} from '@angular/core';
import {ContainerComponent} from "../../components/ui/container.component";
import {ResponsiveGridComponent} from "../../components/ui/responsive-grid.component";
import {DividerComponent} from "../../components/ui/divider.component";
import {Instance} from "../../api/types/instance";
import {ClientService} from "../../api/client.service";
import {PageTitleComponent} from "../../components/ui/text/page-title.component";
import {RouterLink} from "@angular/router";
import {isPlatformBrowser, NgForOf, NgIf, NgOptimizedImage, SlicePipe} from "@angular/common";
import {ContainerTitleComponent} from "../../components/ui/text/container-title.component";
import {SectionTitleComponent} from "../../components/ui/text/section-title.component";
import {FaIconComponent} from "@fortawesome/angular-fontawesome";
import {faFireAlt, faGamepad, faUsers} from "@fortawesome/free-solid-svg-icons";
import {AnnouncementComponent} from "../../components/items/announcement.component";
import {Room} from "../../api/types/rooms/room";
import {RoomComponent} from "../../components/items/room.component";
import {RouterLinkComponent} from "../../components/ui/text/links/router-link.component";
import {AsideLayoutComponent} from "../../components/ui/layouts/aside-layout.component";
import {EventComponent} from "../../components/items/event.component";
import {ActivityPage} from "../../api/types/activity/activity-page";
import {EventPageComponent} from "../../components/items/event-page.component";
import {defer, delay, interval, repeat, Subscription} from "rxjs";
import {ContestBannerComponent} from "../../components/items/contest-banner.component";

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
        RouterLinkComponent,
        AsideLayoutComponent,
        EventComponent,
        EventPageComponent,
        ContestBannerComponent
    ],
  templateUrl: './landing.component.html',
})
export class LandingComponent implements OnDestroy {
    protected instance: Instance | undefined;
    protected rooms: Room[] | undefined;
    protected activity: ActivityPage | undefined;

    private activitySubscription: Subscription | undefined;

    constructor(private client: ClientService, @Inject(PLATFORM_ID) platformId: Object, changeDetector: ChangeDetectorRef) {
      client.getInstance().subscribe(data => this.instance = data);
      client.getRoomListing().subscribe(data => this.rooms = data.data);

      if(isPlatformBrowser(platformId)) {
          inject(NgZone).runOutsideAngular(() => {
              this.activitySubscription = this.fetchActivity()
                  .pipe(repeat({delay: 5000}))
                  .subscribe(data => {
                      this.activity = data;
                      changeDetector.detectChanges();
                  });
          })
      }

      this.fetchActivity().subscribe(data => this.activity = data);
    }

    ngOnDestroy(): void {
        this.activitySubscription?.unsubscribe();
    }

    playerCount(): number {
        if(!this.rooms) return -1;
        let players: number = 0;

        for (let room of this.rooms) {
            players += room.playerIds.length;
        }

        return players;
    }

    fetchActivity() {
        return this.client.getActivityPage(0, 5);
    }

    protected readonly faFireAlt = faFireAlt;
    protected readonly faGamepad = faGamepad;
}
