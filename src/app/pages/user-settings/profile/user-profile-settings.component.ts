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
        CheckboxComponent
    ],
    templateUrl: './user-profile-settings.component.html',
    styles: ``
})

export class UserProfileSettingsComponent {
    ownUser: ExtendedUser | undefined | null;
    form = new FormGroup({
        description: new FormControl(),
        unescapeXml: new FormControl(),
        showModded: new FormControl(),
        showReuploaded: new FormControl(),
        griefToPhotos: new FormControl(),
    });

    iconHash: string = "0";

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

    updateInputs(user: ExtendedUser) {
        this.hasPendingChanges = false;

        this.iconHash = user.iconHash;
        this.form.controls.description.setValue(user.description);

        this.form.controls.unescapeXml.setValue(user.unescapeXmlSequences);
        this.form.controls.showModded.setValue(user.showModdedContent);
        this.form.controls.showReuploaded.setValue(user.showReuploadedContent);
        this.form.controls.griefToPhotos.setValue(user.redirectGriefReportsToPhotos);
    }

    doesPageHavePendingChanges() {
        if (this.ownUser == null) {
            this.hasPendingChanges = false;
            return false;
        } 

        if (this.form.controls.description.getRawValue() != this.ownUser.description
        || this.form.controls.unescapeXml.getRawValue() != this.ownUser.unescapeXmlSequences
        || this.form.controls.showModded.getRawValue() != this.ownUser.showModdedContent
        || this.form.controls.showReuploaded.getRawValue() != this.ownUser.showReuploadedContent
        || this.form.controls.griefToPhotos.getRawValue() != this.ownUser.redirectGriefReportsToPhotos) {
            this.hasPendingChanges = true;
            return true
        }
        
        this.hasPendingChanges = false;
        return false;
    }

    uploadChanges() {
        if (!this.hasPendingChanges) return;

        let request: ProfileUpdateRequest = {
            description: this.form.controls.description.getRawValue(),

            unescapeXmlSequences: this.form.controls.unescapeXml.getRawValue(),
            showModdedContent: this.form.controls.showModded.getRawValue(),
            showReuploadedContent: this.form.controls.showReuploaded.getRawValue(),
            redirectGriefReportsToPhotos: this.form.controls.griefToPhotos.getRawValue(),
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