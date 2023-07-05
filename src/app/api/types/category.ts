import {Level} from "./level";

export interface Category {
  apiRoute: string;
  requiresUser: boolean;
  name: string;
  description: string;
  iconHash: string;
  fontAwesomeIcon: string;
  previewLevel: Level | undefined;
}
