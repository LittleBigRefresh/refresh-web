import {RoomPlayer} from "./room-player";
import {GameVersion} from "../game-version";
import {Platform} from "../platform";

export interface Room {
    roomId: string;
    roomState: number;
    roomMood: number;

    playerIds: RoomPlayer[];

    levelType: number;
    levelId: number;

    platform: Platform;
    game: GameVersion
}
