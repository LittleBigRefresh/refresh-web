import {Component, Input} from '@angular/core';
import {Announcement} from "../../api/types/announcement";
import {ContainerComponent} from "../ui/container.component";
import {FaIconComponent} from "@fortawesome/angular-fontawesome";
import {faBullhorn} from "@fortawesome/free-solid-svg-icons";

@Component({
    selector: 'app-announcement',
    imports: [
        ContainerComponent,
        FaIconComponent
    ],
    template: `
    <div class="bg-yellow rounded px-5 py-2.5">
      <fa-icon [icon]="faBullhorn" class="pr-1.5"></fa-icon>
      <span class="text-xl font-bold">{{data.title}}</span>
      <p>{{data.text}}</p>
    </div>
  `
})
export class AnnouncementComponent {
  @Input({required: true}) data: Announcement = undefined!;
  protected readonly faBullhorn = faBullhorn;
}
