import { GameVersion } from "../game-version";

export interface LevelUpdateRequest {
    title: string | undefined;
    description: string | undefined;

    gameVersion: GameVersion | undefined;
    isReUpload: boolean | undefined;
    originalPublisher: string | undefined;
}