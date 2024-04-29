import {Component, OnInit} from '@angular/core';
import {Contest} from "../../api/types/contests/contest";
import {ApiClient} from "../../api/api-client.service";
import {ActivatedRoute, ParamMap} from "@angular/router";
import {EmbedService} from "../../services/embed.service";
import {TitleService} from "../../services/title.service";
import {UserRoles} from "../../api/types/user-roles";
import {ExtendedUser} from "../../api/types/extended-user";
import {AuthService} from "../../api/auth.service";
import {faCertificate, faPen, faStar} from "@fortawesome/free-solid-svg-icons";
import {ApiListResponse} from "../../api/types/response/api-list-response";
import {Level} from "../../api/types/level";
import * as moment from "dayjs";

@Component({
    selector: 'app-contest',
    templateUrl: './contest.component.html'
})
export class ContestComponent implements OnInit {
    contest: Contest | undefined = undefined;
    ownUser: ExtendedUser | undefined;

    levelEntries: ApiListResponse<Level> | undefined;
    protected readonly UserRoles = UserRoles;
    protected readonly faPen = faPen;
    protected readonly faStar = faStar;
    protected readonly faCertificate = faCertificate;

    constructor(private route: ActivatedRoute, private authService: AuthService, private api: ApiClient, private embed: EmbedService, private title: TitleService) {
    }

    hasStarted(): boolean | undefined {
        if (!this.contest)
            return undefined;

        let now: Date = new Date();
        let start: Date = new Date(this.contest.startDate);
        let end: Date = new Date(this.contest.endDate);

        return now > start;
    }

    hasEnded(): boolean | undefined {
        if (!this.contest)
            return undefined;

        let now: Date = new Date();
        let end: Date = new Date(this.contest.endDate);

        return now > end;
    }

    dateString(date: Date, hasStarted: boolean): string {
        if (hasStarted) {
            return new Date(date).toLocaleDateString();
        }
        return moment(date).fromNow(true);
    }

    ngOnInit(): void {
        this.route.paramMap.subscribe((params: ParamMap) => {
            const id: string = params.get("id")!;
            this.api.GetContestById(id).subscribe(contest => {
                this.contest = contest;
                this.title.setTitle(contest.contestTitle);
                this.embed.embed(contest.contestTitle, contest.contestSummary);

                this.api.GetLevelListing("contest", 10, 0, "contest=" + this.contest?.contestId)
                    .subscribe(data => {
                        this.levelEntries = data;
                    });
            })
        });

        this.ownUser = this.authService.user;
        this.authService.userWatcher.subscribe((data) => {
            this.ownUser = data;
        });
    }
}
