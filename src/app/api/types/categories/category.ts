import {IconName} from "@fortawesome/free-solid-svg-icons";

export interface Category {
    apiRoute: string;
    requiresUser: boolean;
    name: string;
    description: string;
    iconHash: string;
    fontAwesomeIcon: IconName;
    hidden: boolean;
}