export interface ContestEditRequest {
    contestId: string | undefined;
    organizerId: string | undefined;

    creationDate: Date | undefined;
    startDate: Date | undefined;
    endDate: Date | undefined;

    contestTag: string | undefined;
    bannerUrl: string | undefined;

    contestTitle: string | undefined;
    contestSummary: string | undefined;
    contestDetails: string | undefined;
}
