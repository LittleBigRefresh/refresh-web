import {Injectable} from "@angular/core";

@Injectable({
  providedIn: 'root'
})
export class ThemeService {
  public IsThemingSupported(): boolean {
    return true;
  }

  public SetTheme(theme: string): void {
    // @ts-ignore
    return document.getRootNode().children[0].className = theme;
  }

  public GetTheme(): string {
    // @ts-ignore
    return document.getRootNode().children[0].className;
  }
}
