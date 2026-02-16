import {Room} from "../rooms/room";
import {UserStatistics} from "./user-statistics";

export interface User {
    userId: string;
    username: string;
    role: number;
    
    iconHash: string;
    vitaIconHash: string;
    betaIconHash: string;
    description: string;
    joinDate: Date;
    lastLoginDate: Date;

    statistics: UserStatistics;
    activeRoom: Room | undefined;
}
