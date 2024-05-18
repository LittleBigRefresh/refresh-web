import {User} from "../users/user";

export interface PhotoSubject {
    user: User | undefined;
    displayName: string;
    bounds: number[];
}
