import {User} from "../user";
import {GameVersion} from "../game-version";

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

    contestTheme: string;
    contestThemeImageUrl: string;

    allowedGames: GameVersion[];
}
