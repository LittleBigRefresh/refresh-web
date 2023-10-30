import {Component, OnInit} from '@angular/core';
import {Level} from "../../api/types/level";
import {ExtendedUser} from "../../api/types/extended-user";
import {ActivatedRoute, ParamMap, Router} from "@angular/router";
import {catchError, of} from "rxjs";
import {HttpErrorResponse} from "@angular/common/http";
import {AuthService} from "../../api/auth.service";
import {ApiClient} from "../../api/api-client.service";
import {faCancel, faCertificate, faFloppyDisk, faPencil, faTrash} from "@fortawesome/free-solid-svg-icons";
import {LevelEditRequest} from "../../api/types/level-edit-request";

@Component({
  selector: 'edit-level',
  templateUrl: './edit-level.component.html'
})
export class EditLevelComponent implements OnInit{
  level: Level | undefined;
  ownUser: ExtendedUser | undefined;

  title: string = "";
  description: string = "";

  constructor(private authService: AuthService, private apiClient: ApiClient, private router: Router, private route: ActivatedRoute) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe((params: ParamMap) => {
      const id = params.get('id') as number | null;
      if(id == null) return;
      this.apiClient.GetLevelById(id)
        .pipe(catchError((error: HttpErrorResponse, caught) => {
          console.warn(error);
          if (error.status === 404) {
            this.router.navigate(["/404"]);
            return of(undefined);
          }

          return caught;
        }))
        .subscribe(data => {
          this.level = data;
          if(data === undefined) return;

          this.title = data.title;
          this.description = data.description;
        });
    });

    this.ownUser = this.authService.user;
    this.authService.userWatcher.subscribe((data) => {
      this.ownUser = data;
    });
  }

  update() {
    if(this.level == undefined) return;

    const payload: LevelEditRequest = {
      title: this.title,
      description: this.description,
      iconHash: undefined
    }

    this.apiClient.EditLevel(payload, this.level.levelId)
  }

  cancel() {
    window.history.back();
  }

  delete() {

  }

  protected readonly faCertificate = faCertificate;
  protected readonly faPencil = faPencil;
  protected readonly faFloppyDisk = faFloppyDisk;
  protected readonly faTrash = faTrash;
  protected readonly faCancel = faCancel;
}
