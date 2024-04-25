import {Component, OnInit} from '@angular/core';
import {Contest} from "../../api/types/contests/contest";
import {ApiClient} from "../../api/api-client.service";
import {ActivatedRoute, ParamMap} from "@angular/router";
import {EmbedService} from "../../services/embed.service";
import {TitleService} from "../../services/title.service";

@Component({
  selector: 'app-contest',
  templateUrl: './contest.component.html'
})
export class ContestComponent implements OnInit {
    contest: Contest | undefined = undefined;

    constructor(private route: ActivatedRoute, private api: ApiClient, private embed: EmbedService, private title: TitleService) {}

    ngOnInit(): void {
        this.route.paramMap.subscribe((params: ParamMap) => {
            const id: string = params.get("id")!;
            this.api.GetContestById(id).subscribe(contest => {
                this.contest = contest;
                this.title.setTitle(contest.contestTitle);
                this.embed.embed(contest.contestTitle, contest.contestSummary);
            })
        });
    }
}
