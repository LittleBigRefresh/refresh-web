import { User } from "./user";
import {PhotoSubject} from "./photo-subject";

export interface Photo {
    PhotoId: number;

    TakenAt: Date;
    PublishedAt: Date;

    Publisher: User;

    SmallHash: string;
    LargeHash: string;

    Subjects: PhotoSubject[];
}
