import {Level} from "@/api/types/levels/level";

export interface LevelCategory {
    apiRoute: string;
    requiresUser: boolean;
    name: string;
    description: string;
    iconHash: string;
    fontAwesomeIcon: string;
    previewLevel: Level | undefined;
    hidden: boolean;
}
