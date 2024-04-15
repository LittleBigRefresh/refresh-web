import { Pipe, PipeTransform } from '@angular/core';
import {GameVersion} from "../api/types/game-version";

@Pipe({
  name: 'game',
  standalone: true
})
export class GamePipe implements PipeTransform {
  transform(value: GameVersion, short: boolean = false): string {
    const lbp: string = short ? "LBP" : "LittleBigPlanet ";

    switch (value) {
      case GameVersion.LBP1:
        return lbp+"1";
      case GameVersion.LBP2:
        return lbp+"2";
      case GameVersion.LBP3:
        return lbp+"3";
      case GameVersion.LBPVita:
        return lbp+"Vita";
      case GameVersion.LBPPSP:
        return lbp+"PSP";
      case GameVersion.Website:
        return "Website";
      case GameVersion.BetaBuild:
        return short ? "Beta" : "Beta Build";
    }
  }
}
