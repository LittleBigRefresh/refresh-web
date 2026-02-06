import {User} from "../users/user";

export interface Level {
    levelId: number;
    title: string;
    description: string;
    iconHash: string;
    publisher: User | undefined;
    originalPublisher: string | undefined;
    isReUpload: boolean;
    isModded: boolean;
    teamPicked: boolean;
    dateTeamPicked: Date | undefined;
    gameVersion: number;
    score: number;
    slotType: number;
    publishDate: Date;
    updateDate: Date;

    booRatings: number;
    yayRatings: number;
    hearts: number;
    totalPlays: number;
    uniquePlays: number;
}
