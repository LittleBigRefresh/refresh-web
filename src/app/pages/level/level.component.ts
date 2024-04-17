import {Component, Inject, PLATFORM_ID} from '@angular/core';
import {Level} from "../../api/types/levels/level";
import {ClientService} from "../../api/client.service";
import {ActivatedRoute} from "@angular/router";
import {TitleService} from "../../services/title.service";
import {SlugPipe} from "../../pipes/slug.pipe";
import {PageTitleComponent} from "../../components/ui/text/page-title.component";
import {isPlatformBrowser} from "@angular/common";

@Component({
  selector: 'app-level',
  standalone: true,
  imports: [
    PageTitleComponent
  ],
  providers: [
      SlugPipe
  ],
  templateUrl: './level.component.html',
  styles: ``
})
export class LevelComponent {
  level: Level | undefined | null;
  protected readonly isBrowser: boolean;

  constructor(private title: TitleService, private client: ClientService, private slug: SlugPipe,
              route: ActivatedRoute, @Inject(PLATFORM_ID) platformId: Object)
  {
    this.isBrowser = isPlatformBrowser(platformId);
    route.params.subscribe(params => {
      const id: number = +params['id'];
      this.client.getLevelById(id).subscribe(data => this.setDataFromLevel(data));
    });
  }

  setDataFromLevel(data: Level) {
    this.level = data;

    if(this.isBrowser) {
      window.history.replaceState({}, '', `/level/${data.levelId}/${this.slug.transform(data.title)}`);
    }

    this.title.setTitle(data.title);
  }
}
