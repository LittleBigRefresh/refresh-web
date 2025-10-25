import {Component, Inject, PLATFORM_ID} from '@angular/core';
import {Level} from "../../api/types/levels/level";
import {ClientService} from "../../api/client.service";
import {ActivatedRoute, Router} from "@angular/router";
import { AsyncPipe, isPlatformBrowser, NgClass, NgIf } from "@angular/common";
import {LevelAvatarComponent} from "../../components/ui/photos/level-avatar.component";
import {GamePipe} from "../../pipes/game.pipe";
import {LayoutService} from "../../services/layout.service";
import {DividerComponent} from "../../components/ui/divider.component";
import {AuthenticationService} from "../../api/authentication.service";
import { ExtendedUser } from '../../api/types/users/extended-user';
import { UserRoles } from '../../api/types/users/user-roles';
import { PageTitleComponent } from "../../components/ui/text/page-title.component";
import { ButtonComponent } from "../../components/ui/form/button.component";
import { faCertificate, faChevronDown, faChevronUp, faClone, faFloppyDisk, faPencil, faTrash, faUser } from '@fortawesome/free-solid-svg-icons';
import { TextboxComponent } from '../../components/ui/form/textbox.component';
import { FormControl, FormGroup } from '@angular/forms';
import { LevelUpdateRequest } from '../../api/types/levels/level-update-request';
import { BannerService } from '../../banners/banner.service';
import { RefreshApiError } from '../../api/refresh-api-error';
import { sha1Async } from '../../helpers/crypto';
import { CheckboxComponent } from "../../components/ui/form/checkbox.component";
import { GameVersion } from '../../api/types/game-version';
import { FaIconComponent } from "@fortawesome/angular-fontawesome";
import { RadioButtonComponent } from "../../components/ui/form/radio-button.component";
import { TextAreaComponent } from "../../components/ui/form/textarea.component";
import { DateComponent } from "../../components/ui/info/date.component";
import { DropdownMenuComponent } from "../../components/ui/form/dropdown-menu.component";


@Component({
    selector: 'app-level-edit',
    imports: [
    LevelAvatarComponent,
    AsyncPipe,
    DividerComponent,
    PageTitleComponent,
    ButtonComponent,
    TextboxComponent,
    NgIf,
    CheckboxComponent,
    FaIconComponent,
    RadioButtonComponent,
    GamePipe,
    TextAreaComponent,
    DateComponent,
    DropdownMenuComponent
],
    templateUrl: './level-edit.component.html'
})
export class LevelEditComponent {
  level: Level | undefined | null;
  
  protected readonly isBrowser: boolean;
  protected isMobile: boolean = false;
  protected ownUser: ExtendedUser | undefined;

  settingsForm = new FormGroup({
    title: new FormControl(),
    description: new FormControl(),
  });
  
  curatorForm = new FormGroup({
    isReupload: new FormControl(),
    originalPublisher: new FormControl(),
    isTeamPicked: new FormControl(),
    gameVersion: new FormControl(0),
  });
  
  iconHash: string = "0";
  hasTitleChanged: boolean = false;
  hasDescriptionChanged: boolean = false;

  hasReuploadChanged: boolean = false;
  hasOriginalPublisherChanged: boolean = false;
  hasTeamPickedChanged: boolean = false;
  hasGameChanged: boolean = false;

  hasPendingChangesTotal: boolean = false;
  hasPendingChangesLevel: boolean = false;
  hasPendingCuratorChanges: boolean = false;

  showGameMenu: boolean = false;
  gameButtonColor: string = "bg-secondary";

  isUserCurator: boolean = false;
  isUserModerator: boolean = false;
  isUserPublisher: boolean = false;

  constructor(private client: ClientService, protected banner: BannerService, route: ActivatedRoute, 
              protected layout: LayoutService, private auth: AuthenticationService,
              @Inject(PLATFORM_ID) platformId: Object, private router: Router)
  {
    this.isBrowser = isPlatformBrowser(platformId);

    route.params.subscribe(params => {
      const id: number = +params['id'];
      this.client.getLevelById(id).subscribe(data => {
        if(!this.level && data) {
          this.level = data;
          this.updateInputs(data);

          this.auth.user.subscribe(user => {
            if(user) {
              this.ownUser = user;
              this.isUserPublisher = data.publisher != null && user.userId == data.publisher?.userId;
              this.isUserCurator = user.role >= UserRoles.Curator;
              this.isUserModerator = user.role >= UserRoles.Moderator;
            }
          });
        }
      });
    });

    this.layout.isMobile.subscribe(v => this.isMobile = v);
  }

  checkTitleChanges() {
    this.hasTitleChanged = this.settingsForm.controls.title.getRawValue() != this.level?.title;
    this.doesPageHavePendingChanges();
  }

  checkDescriptionChanges() {
    this.hasDescriptionChanged = this.settingsForm.controls.description.getRawValue() != this.level?.description;
    this.doesPageHavePendingChanges();
  }

  setGame(input: GameVersion) {
    this.curatorForm.controls.gameVersion.setValue(input);
    this.hasGameChanged = input != this.level!.gameVersion;
    this.doesPageHavePendingChanges();
    this.setGameButtonColor(input);
  }

  setGameButtonColor(game: GameVersion) {
    switch (game) {
      case 0: this.gameButtonColor = "bg-dark-pink"; break;
      case 1: this.gameButtonColor = "bg-dark-green"; break;
      case 2: this.gameButtonColor = "bg-orange"; break;
      case 3: this.gameButtonColor = "bg-purple"; break;
      case 4: this.gameButtonColor = "bg-light-blue"; break;
      case 6: this.gameButtonColor = "bg-blue"; break;
      default: this.gameButtonColor = "bg-tertiary"; break;
    }
  }

  checkIsReuploadChanges() {
    this.hasReuploadChanged = this.curatorForm.controls.isReupload.getRawValue() != this.level?.isReUpload;
    this.doesPageHavePendingChanges();
  }

  checkOriginalPublisherChanges() {
    this.hasOriginalPublisherChanged = this.curatorForm.controls.originalPublisher.getRawValue() != (this.level?.originalPublisher ?? "");
    this.doesPageHavePendingChanges();
  }

  checkTeamPickChanges() {
    this.hasTeamPickedChanged = this.curatorForm.controls.isTeamPicked.getRawValue() != this.level?.teamPicked;
    this.doesPageHavePendingChanges();
  }

  doesPageHavePendingChanges() {
    this.hasPendingChangesTotal =
      this.doesLevelHavePendingChanges()
      || this.hasTeamPickedChanged;
  }

  doesLevelHavePendingChanges(): boolean {
    return this.hasPendingChangesLevel =
      this.hasTitleChanged
      || this.hasDescriptionChanged
      || this.doesLevelHavePendingCuratorSettingChanges();
  }

  doesLevelHavePendingCuratorSettingChanges(): boolean {
    return this.hasPendingCuratorChanges =
      this.hasGameChanged
      || this.hasReuploadChanged
      || this.hasOriginalPublisherChanged;
  }

  updateInputs(level: Level) {
    this.hasPendingChangesTotal = false;
    this.hasPendingChangesLevel = false;
    this.hasPendingCuratorChanges = false;

    this.settingsForm.controls.title.setValue(level.title);
    this.settingsForm.controls.description.setValue(level.description);

    this.curatorForm.controls.gameVersion.setValue(level.gameVersion);
    this.curatorForm.controls.isTeamPicked.setValue(level.teamPicked);
    this.curatorForm.controls.isReupload.setValue(level.isReUpload);
    this.curatorForm.controls.originalPublisher.setValue(level.originalPublisher);

    this.setGameButtonColor(level.gameVersion);

    this.hasTitleChanged = false;
    this.hasDescriptionChanged = false;
    this.hasTeamPickedChanged = false;
    this.hasReuploadChanged = false;
    this.hasOriginalPublisherChanged = false;
    this.hasGameChanged = false;
  }

  async gameButtonClick() {
    this.showGameMenu = !this.showGameMenu;
  }

  uploadChanges() {
    if (!this.hasPendingChangesTotal) return;

    if (this.hasTeamPickedChanged) this.updateTeamPick();
    if (this.hasPendingChangesLevel) this.updateLevel();
    this.hasPendingChangesTotal = false;
  }

  updateTeamPick() {
    if (this.curatorForm.controls.isTeamPicked.getRawValue()) {
      this.client.teamPickLevel(this.level!.levelId).subscribe({
        error: error => {
          const apiError: RefreshApiError | undefined = error.error?.error;
          this.banner.error("Failed to team pick level", apiError == null ? error.message : apiError.message);
        },
        next: response => {
          this.hasTeamPickedChanged = false;
          this.level!.teamPicked = true;
          this.banner.success("Level team picked!", "The level was successfully team picked.");
        }
      });
    }
    else {
      this.client.unTeamPickLevel(this.level!.levelId).subscribe({
        error: error => {
          const apiError: RefreshApiError | undefined = error.error?.error;
          this.banner.error("Failed to remove team pick", apiError == null ? error.message : apiError.message);
        },
        next: response => {
          this.hasTeamPickedChanged = false;
          this.level!.teamPicked = false;
          this.banner.success("Team pick removed!", "The level is no longer team picked.");
        }
      });
    }
  }

  updateLevel() {
    let request: LevelUpdateRequest = {
      title: this.settingsForm.controls.title.getRawValue(),
      description: this.settingsForm.controls.description.getRawValue(),

      gameVersion: this.curatorForm.controls.gameVersion.getRawValue()!,
      isReUpload: this.curatorForm.controls.isReupload.getRawValue(),
      originalPublisher: this.curatorForm.controls.originalPublisher.getRawValue(),
    };

    this.client.updateLevelById(this.level!.levelId, request, this.hasPendingCuratorChanges).subscribe({
      error: error => {
        const apiError: RefreshApiError | undefined = error.error?.error;
        this.banner.error("Failed to update the level", apiError == null ? error.message : apiError.message);
      },
      next: response => {
        this.banner.success("Level updated!", "The level was successfully updated.");

        // Update level data
        this.level = response;
        this.updateInputs(response);
      }
    });
  }

  async uploadIcon($event: any) {
    const file: File = $event.target.files[0];
    console.log(file);

    const data: ArrayBuffer = await file.arrayBuffer();
    const hash: string = await sha1Async(data);

    this.client.uploadAsset(hash, data).subscribe({
      error: error => {
        const apiError: RefreshApiError | undefined = error.error?.error;
        this.banner.warn("Failed to upload level icon", apiError == null ? error.message : apiError.message);
      },
      next: _ => {
        this.updateLevelIcon(hash);
      }
    });
  }

  updateLevelIcon(hash: string) {
    this.client.updateLevelIconById(this.level!.levelId, hash, !this.isUserPublisher).subscribe({
      error: error => {
        const apiError: RefreshApiError | undefined = error.error?.error;
        this.banner.error("Failed to update the level icon", apiError == null ? error.message : apiError.message);
      },
      next: response => {
        this.banner.success("Level updated!", "The level icon was successfully updated.");

        // Update level data
        this.level = response;
      }
    });
  }

  avatarErr(img: EventTarget | null): void {
    if(!(img instanceof HTMLImageElement)) return;
    img.srcset = "/assets/missingLevel.svg";
  }

  delete() {
    if (true) {
      this.banner.success("DELETE LOL", "yuo pressed oit!!");
      return;
    }

    /*
    if (this.level == undefined) return;

    this.client.deleteLevelById(this.level.levelId, this.isUserPublisher()).subscribe({
      error: error => {
        const apiError: RefreshApiError | undefined = error.error?.error;
        this.banner.error("Failed to delete the level", apiError == null ? error.message : apiError.message);

        // Update level data
        this.client.getLevelById(this.level!.levelId).subscribe(data => {
          this.level = data;
        });
      },
      next: response => {
        this.banner.success("Level deleted!", "The level was successfully deleted.");

        // Navigate (TODO: redirect to page before both the edit and the details page)
        this.router.navigate(['**']);
      }
    });
    */
  }

  protected readonly faFloppyDisk = faFloppyDisk;
  protected readonly faPencil = faPencil;
  protected readonly faTrash = faTrash;
  protected readonly faUser = faUser;
  protected readonly faCertificate = faCertificate;
  protected readonly faClone = faClone;
  protected readonly faChevronDown = faChevronDown;
  protected readonly faChevronUp = faChevronUp;
}
