import { User } from "./user";

export interface Photo {
    PhotoId: number;

    TakenAt: Date;
    PublishedAt: Date;
    
    Publisher: User;

    SmallHash: string;
    LargeHash: string;
}