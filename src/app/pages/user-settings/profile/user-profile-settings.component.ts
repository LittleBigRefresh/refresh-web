import { Component } from "@angular/core";
import { ExtendedUser } from "../../../api/types/users/extended-user";
import { TitleService } from "../../../services/title.service";
import { AuthenticationService } from "../../../api/authentication.service";
import { LayoutService } from "../../../services/layout.service";
import { ClientService } from "../../../api/client.service";
import { ProfileUpdateRequest } from "../../../api/types/users/profile-update-request";
import { PageTitleComponent } from "../../../components/ui/text/page-title.component";
import { TwoPaneLayoutComponent } from "../../../components/ui/layouts/two-pane-layout.component";
import { ContainerComponent } from "../../../components/ui/container.component";
import { FormControl, FormGroup } from "@angular/forms";
import { faFloppyDisk, faPencil } from "@fortawesome/free-solid-svg-icons";
import { PaneTitleComponent } from "../../../components/ui/text/pane-title.component";
import { DividerComponent } from "../../../components/ui/divider.component";
import { sha1Async } from "../../../helpers/crypto";
import { UserAvatarComponent } from "../../../components/ui/photos/user-avatar.component";
import { FaIconComponent } from "@fortawesome/angular-fontawesome";
import { AsyncPipe } from "@angular/common";
import { TextAreaComponent } from "../../../components/ui/form/textarea.component";
import { ButtonComponent } from "../../../components/ui/form/button.component";
import { BannerService } from "../../../banners/banner.service";
import { RefreshApiError } from "../../../api/refresh-api-error";
import { CheckboxComponent } from "../../../components/ui/form/checkbox.component";
import { RadioButtonComponent } from "../../../components/ui/form/radio-button.component";
import { ContentVisibility } from "../../../api/types/content-visibility";

@Component({
    selector: 'app-user-profile-settings',
    imports: [
    PageTitleComponent,
    TwoPaneLayoutComponent,
    ContainerComponent,
    TextAreaComponent,
    PaneTitleComponent,
    DividerComponent,
    FaIconComponent,
    AsyncPipe,
    UserAvatarComponent,
    ButtonComponent,
    CheckboxComponent,
    RadioButtonComponent,
],
    templateUrl: './user-profile-settings.component.html',
    styles: ``
})

export class UserProfileSettingsComponent {
    ownUser: ExtendedUser | undefined | null;
    settingsForm = new FormGroup({
        description: new FormControl(),
        unescapeXml: new FormControl(),
        showModded: new FormControl(),
        showReuploaded: new FormControl(),
        griefToPhotos: new FormControl(),
        // profileVisibility's values have to be offset by 3, else for some reason clicking a profile
        // visibility button will also switch a level visibility button, but not the other way around,
        // even if profileVisibility and levelVisibility are in different FormGroups
        levelVisibility: new FormControl(0),
        profileVisibility: new FormControl(0),
    });

    iconHash: string = "0";

    hasDescriptionChanged: boolean = false;
    hasGriefToPhotoChanged: boolean = false;
    hasShowModdedChanged: boolean = false;
    hasShowReuploadedChanged: boolean = false;
    hasUnescapeXmlChanged: boolean = false;
    hasLevelVisibilityChanged: boolean = false;
    hasProfileVisibilityChanged: boolean = false;
    hasPendingChanges: boolean = false;

    protected isMobile: boolean = false;

    constructor(private title: TitleService, private client: ClientService, private auth: AuthenticationService, 
                protected layout: LayoutService, private bannerService: BannerService) 
    {
        this.auth.user.subscribe(user => {
            if (user) {
                this.updateInputs(user);
                this.ownUser = user;
            }
        });

        this.layout.isMobile.subscribe(v => this.isMobile = v);
    }

    checkDescriptionChanges() {
        this.hasDescriptionChanged = this.settingsForm.controls.description.getRawValue() != this.ownUser?.description;
        this.doesPageHavePendingChanges();
    }

    checkGriefToPhotosChanges() {
        this.hasGriefToPhotoChanged = this.settingsForm.controls.griefToPhotos.getRawValue() != this.ownUser?.redirectGriefReportsToPhotos;
        this.doesPageHavePendingChanges();
    }

    checkShowModdedChanges() {
        this.hasGriefToPhotoChanged = this.settingsForm.controls.showModded.getRawValue() != this.ownUser?.showModdedContent;
        this.doesPageHavePendingChanges();
    }

    checkShowReuploadedChanges() {
        this.hasGriefToPhotoChanged = this.settingsForm.controls.showReuploaded.getRawValue() != this.ownUser?.showReuploadedContent;
        this.doesPageHavePendingChanges();
    }

    checkUnescapeXmlChanges() {
        this.hasGriefToPhotoChanged = this.settingsForm.controls.unescapeXml.getRawValue() != this.ownUser?.unescapeXmlSequences;
        this.doesPageHavePendingChanges();
    }

    setLevelVisibility(input: ContentVisibility) {
        this.settingsForm.controls.levelVisibility.setValue(input);
        this.hasLevelVisibilityChanged = input != this.ownUser!.levelVisibility;
        this.doesPageHavePendingChanges();
    }

    setProfileVisibility(input: ContentVisibility) {
        this.settingsForm.controls.profileVisibility.setValue(input);
        this.hasProfileVisibilityChanged = input != this.ownUser!.profileVisibility;
        this.doesPageHavePendingChanges();
    }

    doesPageHavePendingChanges() {
        this.hasPendingChanges =
            this.hasDescriptionChanged
            || this.hasGriefToPhotoChanged
            || this.hasShowModdedChanged
            || this.hasShowReuploadedChanged
            || this.hasShowModdedChanged
            || this.hasUnescapeXmlChanged
            || this.hasLevelVisibilityChanged
            || this.hasProfileVisibilityChanged;
    }

    updateInputs(user: ExtendedUser) {
        this.hasPendingChanges = false;

        this.iconHash = user.iconHash;
        this.settingsForm.controls.description.setValue(user.description);

        this.settingsForm.controls.unescapeXml.setValue(user.unescapeXmlSequences);
        this.settingsForm.controls.showModded.setValue(user.showModdedContent);
        this.settingsForm.controls.showReuploaded.setValue(user.showReuploadedContent);
        this.settingsForm.controls.griefToPhotos.setValue(user.redirectGriefReportsToPhotos);

        this.settingsForm.controls.levelVisibility.setValue(user.levelVisibility);
        this.settingsForm.controls.profileVisibility.setValue(user.profileVisibility);
    }

    

    uploadChanges() {
        if (!this.hasPendingChanges) return;

        let request: ProfileUpdateRequest = {
            description: this.settingsForm.controls.description.getRawValue(),

            unescapeXmlSequences: this.settingsForm.controls.unescapeXml.getRawValue(),
            showModdedContent: this.settingsForm.controls.showModded.getRawValue(),
            showReuploadedContent: this.settingsForm.controls.showReuploaded.getRawValue(),
            redirectGriefReportsToPhotos: this.settingsForm.controls.griefToPhotos.getRawValue(),

            levelVisibility: this.settingsForm.controls.levelVisibility.getRawValue()!,
            profileVisibility: this.settingsForm.controls.levelVisibility.getRawValue()!,
        };

        this.auth.UpdateProfile(request);
    }

    async avatarChanged($event: any) {
        const file: File = $event.target.files[0]
        console.log(file);

        const data: ArrayBuffer = await file.arrayBuffer();
        const hash: string = await sha1Async(data);

        this.client.uploadAsset(hash, data).subscribe({
            error: error => {
                const apiError: RefreshApiError | undefined = error.error?.error;
                this.bannerService.warn("Failed to upload your new avatar", apiError == null ? error.message : apiError.message);
            },
            next: _ => {
                this.auth.UpdateUserAvatar(hash);
            }
        });
    }

    avatarErr(img: EventTarget | null): void {
        if(!(img instanceof HTMLImageElement)) return;
        img.srcset = "/assets/missingUser.svg";
    }

    protected readonly faPencil = faPencil;
    protected readonly faFloppyDisk = faFloppyDisk;
}