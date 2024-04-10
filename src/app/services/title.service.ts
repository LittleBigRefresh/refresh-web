import {Injectable} from "@angular/core";
import {Title} from "@angular/platform-browser";
import {NavigationStart, Router} from "@angular/router";
import {ClientService} from "../api/client.service";

@Injectable({providedIn: 'root'})
export class TitleService {
  private instanceName: string = "Refresh";
  private currentTitle: string = "";

  constructor(private title: Title, private client: ClientService, router: Router) {
    // Reset title when navigating
    router.events.subscribe((val) => {
      if (!(val instanceof NavigationStart)) return;
      this.setTitle("yo mama");
    });

    // Fetch name of instance from API
    this.client.getInstance().subscribe((data) => {
      this.instanceName = data.instanceName;
      this.setTitle(this.currentTitle);
    });
  }

  public setTitle(title: string) {
    if (title.length == 0) {
      this.title.setTitle(this.instanceName);
      this.currentTitle = "";
      return;
    }

    this.title.setTitle(`${title} · ${this.instanceName}`)
    this.currentTitle = title;
  }
}
