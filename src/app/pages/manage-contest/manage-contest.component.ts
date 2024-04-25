import {Component, OnInit} from '@angular/core';
import {Contest} from "../../api/types/contests/contest";
import {ApiClient} from "../../api/api-client.service";
import {ActivatedRoute, ParamMap} from "@angular/router";
import {
    faBook,
    faCamera,
    faCancel,
    faFloppyDisk,
    faHashtag, faHourglassEnd, faHourglassStart,
    faMedal,
    faPencil, faStop, faStopCircle, faTrafficLight, faUser
} from "@fortawesome/free-solid-svg-icons";
import {ContestEditRequest} from "../../api/types/contests/contest-edit-request";
import {ExtendedUser} from "../../api/types/extended-user";
import {AuthService} from "../../api/auth.service";

@Component({
  selector: 'app-manage-contest',
  templateUrl: './manage-contest.component.html'
})
export class ManageContestComponent implements OnInit {
    protected create: boolean = false;
    protected existingContest: Contest | undefined = undefined;
    protected newContest: ContestEditRequest | undefined = undefined;

    ownUser: ExtendedUser | undefined;

    constructor(private api: ApiClient, private route: ActivatedRoute, private authService: AuthService) {
        this.ownUser = this.authService.user;
        this.authService.userWatcher.subscribe((data) => {
            this.ownUser = data;
        });
    }

    ngOnInit(): void {
        this.route.paramMap.subscribe((params: ParamMap) => {
            if(!params.get('id')) {
                this.create = true;
                this.newContest = {
                    bannerUrl: "https://i.imgur.com/XhmwFvC.png",
                    contestDetails: "",
                    contestId: "",
                    contestSummary: "",
                    contestTag: "",
                    contestTitle: "",
                    endDate: undefined,
                    organizerId: this.ownUser?.userId,
                    startDate: undefined,
                };
                return;
            }

            const id: string = params.get('id')!;
            this.api.GetContestById(id).subscribe((contest: Contest) => {
                this.existingContest = contest;
                this.newContest = {
                    bannerUrl: contest.bannerUrl,
                    contestDetails: contest.contestDetails,
                    contestId: contest.contestId,
                    contestSummary: contest.contestSummary,
                    contestTag: contest.contestTag,
                    contestTitle: contest.contestTitle,
                    endDate: contest.endDate,
                    organizerId: contest.organizer.userId,
                    startDate: contest.startDate,
                };
            })
        });
    }

    submit(): void {
        if(!this.newContest) return;

        if(this.create) {
            this.api.CreateContest(this.newContest).subscribe()
        } else {
            this.api.UpdateContest(this.newContest).subscribe()
        }
    }

    protected readonly faFloppyDisk = faFloppyDisk;
    protected readonly faCancel = faCancel;
    protected readonly faMedal = faMedal;
    protected readonly faHashtag = faHashtag;
    protected readonly faCamera = faCamera;
    protected readonly faPencil = faPencil;
    protected readonly faBook = faBook;
    protected readonly faHourglassStart = faHourglassStart;
    protected readonly faHourglassEnd = faHourglassEnd;
    protected readonly faUser = faUser;
}
