import {User} from "@/api/types/users/user";

export interface Level {
    levelId: number;
    title: string;
    description: string;
    iconHash: string;
    publishDate: Date;
    updateDate: Date;
    booRatings: number;
    yayRatings: number;
    hearts: number;
    totalPlays: number;
    uniquePlays: number;
    publisher: User | undefined;
    teamPicked: boolean;
    gameVersion: number;
    score: number;
}
