import { User } from "./user";
import {PhotoSubject} from "./photo-subject";

export interface Photo {
    photoId: number;

    takenAt: Date;
    publishedAt: Date;

    publisher: User;

    smallHash: string;
    largeHash: string;

    subjects: PhotoSubject[];
}
