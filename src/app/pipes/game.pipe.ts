import { Pipe, PipeTransform } from '@angular/core';
import {GameVersion} from "../api/types/game-version";

@Pipe({
  name: 'game',
  standalone: true
})
export class GamePipe implements PipeTransform {
  transform(value: GameVersion): string {
    switch (value) {
      case GameVersion.LBP1:
        return "LittleBigPlanet 1";
      case GameVersion.LBP2:
        return "LittleBigPlanet 2";
      case GameVersion.LBP3:
        return "LittleBigPlanet 3";
      case GameVersion.LBPVita:
        return "LittleBigPlanet Vita";
      case GameVersion.LBPPSP:
        return "LittleBigPlanet PSP";
      case GameVersion.Website:
        return "Website";
      case GameVersion.BetaBuild:
        return "Beta Build";
    }
  }
}
