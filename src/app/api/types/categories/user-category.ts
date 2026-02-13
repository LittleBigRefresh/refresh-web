import {Category} from "./category";
import {User} from "../users/user";

export interface UserCategory extends Category {
    previewUser: User | undefined;
}