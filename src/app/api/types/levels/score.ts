import {Level} from "./level";
import {User} from "../users/user";
import {GameVersion} from "../game-version";
import {Platform} from "../platform";

export interface Score {
    scoreId: string;
    level: Level;
    players: User[];

    scoreSubmitted: Date;
    score: number;
    scoreType: number;

    game: GameVersion;
    platform: Platform;
    
    // This isn't part of the API spec. This is internal to refresh-web.
    rank: number | undefined;
}
