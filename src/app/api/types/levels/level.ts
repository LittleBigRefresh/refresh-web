import {User} from "../users/user";
import { LevelRelations } from "./level-relations";
import { LevelType } from "./level-type";

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
    dateTeamPicked: Date;
    gameVersion: number;
    score: number;
    slotType: number;
    levelType: LevelType;
    isAdventure: boolean;
    publishDate: Date;
    updateDate: Date;

    booRatings: number;
    yayRatings: number;
    hearts: number;
    totalPlays: number;
    uniquePlays: number;

    ownRelations: LevelRelations | undefined;
}
