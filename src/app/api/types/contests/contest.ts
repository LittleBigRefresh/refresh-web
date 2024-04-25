import {User} from "../user";

export interface Contest {
    contestId: string;
    organizer: User;

    creationDate: Date;
    startDate: Date;
    endDate: Date;

    contestTag: string;
    bannerUrl: string;

    contestTitle: string;
    contestSummary: string;
    contestDetails: string;
}
