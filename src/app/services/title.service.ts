import {Injectable} from "@angular/core";
import {Title} from "@angular/platform-browser";
import {ActivatedRouteSnapshot, NavigationEnd, NavigationStart, Router} from "@angular/router";
import {ClientService} from "../api/client.service";
import {EmbedService} from "./embed.service";

@Injectable({providedIn: 'root'})
export class TitleService {
  private instanceName: string = "Refresh";
  private currentTitle: string = "";

  constructor(private title: Title, client: ClientService, router: Router) {
    router.events.subscribe((val) => {
      // clear title when starting navigating
      if (val instanceof NavigationStart)
        this.setTitle("");

      // set title from route definition after loading
      if(val instanceof NavigationEnd && !this.isTitleAlreadyDefined())
        this.setTitle(this.getCurrentPageTitle(router) || "")
    });

    // Fetch name of instance from API
    client.getInstance().subscribe((data) => {
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

    this.title.setTitle(`[beta] ${title} · ${this.instanceName}`)
    this.currentTitle = title;
  }

  public getCurrentPageTitle(router: Router) {
    return this.getRouteTitle(router.routerState.snapshot.root);
  }

  // stupid check because we can't persist the title information through hydration in ssr
  private isTitleAlreadyDefined(): boolean {
    return this.title.getTitle() != this.instanceName;
  }

  private getRouteTitle(route: ActivatedRouteSnapshot): string | undefined {
    let title: string | undefined = undefined;

    // Traverse through the child routes
    if (route.firstChild) {
      title = this.getRouteTitle(route.firstChild);
    }

    // If the child route has a title, update the title
    if (route.data && route.data["title"]) {
      title = route.data["title"];
    }

    return title;
  }

}
