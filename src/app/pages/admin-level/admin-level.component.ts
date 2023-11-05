import {Component} from '@angular/core';
import {Level} from "../../api/types/level";
import {ActivatedRoute, ParamMap} from "@angular/router";
import {ApiClient} from "../../api/api-client.service";
import {EMPTY, switchMap, tap} from "rxjs";
import {faCertificate, faCheck, faFloppyDisk, faTrash} from "@fortawesome/free-solid-svg-icons";
import {AdminService} from "../../api/admin.service";

@Component({
    selector: 'app-admin-level',
    templateUrl: './admin-level.component.html'
})
export class AdminLevelComponent {
    level: Level | undefined = undefined;

    teamPicked: boolean = false;

    constructor(private route: ActivatedRoute, private apiClient: ApiClient, private adminService: AdminService) {
    }

    ngOnInit(): void {
        this.route.paramMap.pipe(switchMap((params: ParamMap) => {
            const id = params.get('id') as number | null;

            if (id !== null && id !== undefined) {
                return this.getLevelById(id);
            }

            return EMPTY;
        }))
            .subscribe();
    }

    private getLevelById(id: number) {
        return this.apiClient.GetLevelById(id)
            .pipe(tap((data) => {
                    this.level = data;
                    if (data === undefined) return;

                    this.teamPicked = data.teamPicked;
                })
            );
    }

    protected readonly faCertificate = faCertificate;
    protected readonly faCheck = faCheck;

    submit() {
        if (this.level == undefined) return;

        if (this.teamPicked != this.level.teamPicked) {
            if (this.teamPicked) this.adminService.AdminAddTeamPick(this.level);
            else this.adminService.AdminRemoveTeamPick(this.level);
        }
    }

    delete() {
        if (this.level == undefined) return;
        this.adminService.AdminDeleteLevel(this.level);
    }

    protected readonly faTrash = faTrash;
    protected readonly faFloppyDisk = faFloppyDisk;
}
