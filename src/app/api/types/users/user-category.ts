import {User} from "./user";
import {IconName} from "@fortawesome/free-solid-svg-icons";

export interface UserCategory {
    apiRoute: string;
    requiresUser: boolean;
    name: string;
    description: string;
    iconHash: string;
    fontAwesomeIcon: IconName;
    previewUser: User | undefined;
    hidden: boolean;
}