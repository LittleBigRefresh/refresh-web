import {Category} from "./category";
import {Level} from "../levels/level";

export interface LevelCategory extends Category {
    previewLevel: Level | undefined;
}
