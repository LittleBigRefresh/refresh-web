import {RoomPlayer} from "./room-player";

export interface Room {
    roomId: string;
    roomState: number;
    roomMood: number;

    playerIds: RoomPlayer[];

    levelType: number;
    levelId: number;

    platform: number;
    game: number
}
