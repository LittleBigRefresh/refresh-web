import {Level} from "./level";
import {IconName} from "@fortawesome/free-solid-svg-icons";

export interface LevelCategory {
    apiRoute: string;
    requiresUser: boolean;
    name: string;
    description: string;
    iconHash: string;
    fontAwesomeIcon: IconName;
    previewLevel: Level | undefined;
    hidden: boolean;
}
