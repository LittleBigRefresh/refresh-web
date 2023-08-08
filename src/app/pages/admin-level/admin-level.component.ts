import {Component} from '@angular/core';
import {Level} from "../../api/types/level";
import {ActivatedRoute, ParamMap} from "@angular/router";
import {ApiClient} from "../../api/api-client";
import {EMPTY, switchMap, tap} from "rxjs";
import {faCertificate, faCheck, faFlag} from "@fortawesome/free-solid-svg-icons";

@Component({
  selector: 'app-admin-level',
  templateUrl: './admin-level.component.html'
})
export class AdminLevelComponent {
  level: Level | undefined = undefined;

  public readonly pickId: string = "admin-level-pick";

  constructor(private route: ActivatedRoute, private apiClient: ApiClient) {}

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

          const pickInput: HTMLInputElement = (<HTMLInputElement>document.getElementById(this.pickId));
          pickInput.checked = data.teamPicked;
        })
      );
  }

  protected readonly faCertificate = faCertificate;
  protected readonly faCheck = faCheck;

  submit() {
    if(this.level == undefined) return;
    const pickInput: HTMLInputElement = (<HTMLInputElement>document.getElementById(this.pickId));

    if(pickInput.checked != this.level.teamPicked) {
      if(pickInput.checked) this.apiClient.AdminAddTeamPick(this.level);
      else this.apiClient.AdminRemoveTeamPick(this.level);
    }
  }
}
