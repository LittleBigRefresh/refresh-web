import {User} from "../users/user";
import {Level} from "../levels/level";
import {PhotoSubject} from "./photo-subject";

export interface Photo {
    photoId: number;

    takenAt: Date;
    publishedAt: Date;

    publisher: User;

    level: Level | undefined;
    levelName: string | undefined;
    levelType: string | undefined;
    levelId: number | undefined;

    largeHash: string;

    subjects: PhotoSubject[];
}
