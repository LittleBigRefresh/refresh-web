import {Injectable} from "@angular/core";
import {Title} from "@angular/platform-browser";
import {ApiClient} from "../api/api-client";
import {NavigationStart, Router} from "@angular/router";

@Injectable({providedIn: 'root'})
export class TitleService {
  private instanceName: string = "Refresh";

  constructor(private title: Title, private apiClient: ApiClient, router: Router) {
    router.events.subscribe((val) => {
      if (!(val instanceof NavigationStart)) return;
      this.setTitle("");
    })
  }

  public setTitle(title: string) {
    if(title.length == 0) {
      this.title.setTitle(this.instanceName);
      return;
    }

    this.title.setTitle(`${title} - ${this.instanceName}`)
  }
}
