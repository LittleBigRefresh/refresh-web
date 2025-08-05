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
import { faPencil } from "@fortawesome/free-solid-svg-icons";
import { RouterLink } from "@angular/router";
import { PaneTitleComponent } from "../../../components/ui/text/pane-title.component";
import { DividerComponent } from "../../../components/ui/divider.component";
import { sha1Async } from "../../../helpers/crypto";
import { UserAvatarComponent } from "../../../components/ui/photos/user-avatar.component";
import { FaIconComponent } from "@fortawesome/angular-fontawesome";
import { AsyncPipe, NgClass, NgOptimizedImage, NgStyle } from "@angular/common";
import { TextAreaComponent } from "../../../components/ui/form/textarea.component";

@Component({
    selector: 'app-user-profile-settings',
    imports: [
        PageTitleComponent,
        TwoPaneLayoutComponent,
        ContainerComponent,
        TextAreaComponent,
        RouterLink,
        PaneTitleComponent,
        DividerComponent,
        FaIconComponent,
        AsyncPipe,
        UserAvatarComponent,
    ],
    templateUrl: './user-profile-settings.component.html',
    styles: ``
})

export class UserProfileSettingsComponent {
    ownUser: ExtendedUser | undefined | null;
    form = new FormGroup({
        description: new FormControl(),
    });

    iconHash: string = "0";
    description: string = "";

    unescapeXml: boolean = false;
    showModded: boolean = true;
    showReuploaded: boolean = true;

    protected isMobile: boolean = false;

    constructor(private title: TitleService, private client: ClientService, private auth: AuthenticationService, 
                protected layout: LayoutService) 
    {
        this.auth.user.subscribe(user => {
            if (user) {
                this.ownUser = user;
                this.updateInputs(user);
            }
        });

        this.layout.isMobile.subscribe(v => this.isMobile = v);
    }

    updateInputs(user: ExtendedUser) {
        this.iconHash = user.iconHash;
        this.description = user.description;

        this.unescapeXml = user.unescapeXmlSequences;
        this.showModded = user.showModdedContent;
        this.showReuploaded = user.showReuploadedContent;
    }

    uploadChanges() {
        let request: ProfileUpdateRequest = {
            description: this.description,

            unescapeXmlSequences: this.unescapeXml,
            showModdedContent: this.showModded,
            showReuploadedContent: this.showReuploaded,
        };

        this.auth.UpdateProfile(request);
    }

    async avatarChanged($event: any) {
        const file: File = $event.target.files[0]
        console.log(file);

        const data: ArrayBuffer = await file.arrayBuffer();
        const hash: string = await sha1Async(data);

        this.client.uploadAsset(hash, data).subscribe(_ => {
            this.auth.UpdateUserAvatar(hash);
        });
    }

    avatarErr(img: EventTarget | null): void {
        if(!(img instanceof HTMLImageElement)) return;
        img.srcset = "/assets/missingUser.svg";
    }

    protected readonly faPencil = faPencil;
}