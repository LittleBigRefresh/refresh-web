import {GameVersion} from "./game-version";

export interface LevelEditRequest {
    title: string | undefined;
    description: string | undefined;
    iconHash: string | undefined;
    gameVersion: string | undefined;
}
