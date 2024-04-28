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

@Component({
    selector: 'app-contest',
    templateUrl: './contest.component.html'
})
export class ContestComponent implements OnInit {
    contest: Contest | undefined = undefined;
    ownUser: ExtendedUser | undefined;

    pickedLevels: ApiListResponse<Level> | undefined;
    protected readonly UserRoles = UserRoles;
    protected readonly faPen = faPen;
    protected readonly faStar = faStar;
    protected readonly faCertificate = faCertificate;

    constructor(private route: ActivatedRoute, private authService: AuthService, private api: ApiClient, private embed: EmbedService, private title: TitleService) {
    }

    ngOnInit(): void {
        this.route.paramMap.subscribe((params: ParamMap) => {
            const id: string = params.get("id")!;
            this.api.GetContestById(id).subscribe(contest => {
                this.contest = contest;
                this.title.setTitle(contest.contestTitle);
                this.embed.embed(contest.contestTitle, contest.contestSummary);
            })
        });

        this.ownUser = this.authService.user;
        this.authService.userWatcher.subscribe((data) => {
            this.ownUser = data;
        });

        this.api.GetLevelListing("contest", 10, 0)
            .subscribe(data => {
                this.pickedLevels = data;
            });
    }
}
