import { Component } from "@angular/core";
import { FormControl, FormGroup } from "@angular/forms";
import { faChevronDown, faChevronUp, faFloppyDisk, faPencil, faTrash, faUser } from "@fortawesome/free-solid-svg-icons";
import { AsyncPipe } from "@angular/common";
import { UserRoles } from "../../../api/types/users/user-roles";
import { ExtendedUser } from "../../../api/types/users/extended-user";
import { ClientService } from "../../../api/client.service";
import { AuthenticationService } from "../../../api/authentication.service";
import { BannerService } from "../../../banners/banner.service";
import { RefreshApiError } from "../../../api/refresh-api-error";
import { ActivatedRoute } from "@angular/router";
import { AdminUserUpdateRequest } from "../../../api/types/users/admin-user-update-request";
import { LayoutService } from "../../../services/layout.service";
import { CheckboxComponent } from "../../../components/ui/form/checkbox.component";
import { UserAvatarGeneralComponent } from "../../../components/ui/photos/user-avatar-general.component";
import { PageTitleComponent } from "../../../components/ui/text/page-title.component";
import { ButtonComponent } from "../../../components/ui/form/button.component";
import { TextAreaComponent } from "../../../components/ui/form/textarea.component";
import { TwoPaneLayoutComponent } from "../../../components/ui/layouts/two-pane-layout.component";
import { ContainerComponent } from "../../../components/ui/container.component";
import { PaneTitleComponent } from "../../../components/ui/text/pane-title.component";
import { DropdownMenuComponent } from "../../../components/ui/form/dropdown-menu.component";
import { RadioButtonComponent } from "../../../components/ui/form/radio-button.component";
import { RolePipe } from "../../../pipes/role.pipe";
import { DividerComponent } from "../../../components/ui/divider.component";
import { TextboxComponent } from "../../../components/ui/form/textbox.component";

@Component({
    selector: 'app-admin-user-settings',
    imports: [
    AsyncPipe,
    RolePipe,
    CheckboxComponent,
    UserAvatarGeneralComponent,
    PageTitleComponent,
    ButtonComponent,
    TextAreaComponent,
    TwoPaneLayoutComponent,
    ContainerComponent,
    PaneTitleComponent,
    DropdownMenuComponent,
    RadioButtonComponent,
    DividerComponent,
    TextboxComponent
],
    templateUrl: './admin-user-settings.component.html',
    styles: ``
})

export class AdminUserSettingsComponent {
    ownUser: ExtendedUser | undefined | null;
    targetUser: ExtendedUser | undefined | null;
    
    metadataForm = new FormGroup({
        username: new FormControl(),
        description: new FormControl(),
        role: new FormControl(UserRoles.User),
        resetIcon: new FormControl(),
        resetVitaIcon: new FormControl(),
        resetBetaIcon: new FormControl(),
    });

    hasUsernameChanged: boolean = false;
    hasDescriptionChanged: boolean = false;
    hasRoleChanged: boolean = false;
    shouldResetIcon: boolean = false;
    shouldResetVitaIcon: boolean = false;
    shouldResetBetaIcon: boolean = false;

    showRoleMenu: boolean = false;
    hasPendingChanges: boolean = false;

    protected adminValue: UserRoles = UserRoles.Admin;
    protected moderatorValue: UserRoles = UserRoles.Moderator;
    protected curatorValue: UserRoles = UserRoles.Curator;
    protected trustedValue: UserRoles = UserRoles.Trusted;
    protected userValue: UserRoles = UserRoles.User;

    protected isMobile: boolean = false;

    constructor(private client: ClientService, private auth: AuthenticationService, 
        private banner: BannerService, route: ActivatedRoute, protected layout: LayoutService) 
    {
        this.auth.user.subscribe(ownUser => {
            if (ownUser) {
                this.ownUser = ownUser;

                if (ownUser.role >= UserRoles.Moderator) {
                    // Only try getting user if we are a signed in moderator or above
                    route.params.subscribe(params => {
                        const username: string | undefined = params['username'];
                        const uuid: string | undefined = params['uuid'];
                        
                        if (uuid !== undefined || username !== undefined) {
                            this.client.getExtendedUserByEitherLookup(username, uuid).subscribe({
                                error: error => {
                                    const apiError: RefreshApiError | undefined = error.error?.error;
                                    this.banner.error("Failed to get extended user", apiError == null ? error.message : apiError.message);
                                },
                                next: response => {
                                    this.updateInputs(response);
                                }
                            });
                        }
                    });
                }
                else {
                    this.banner.warn("You are not a moderator", "Get out!");
                }
            }
        });

        this.layout.isMobile.subscribe(v => this.isMobile = v);
    }

    checkResetIcon() {
        this.shouldResetIcon = this.metadataForm.controls.resetIcon.getRawValue();
        this.doesPageHavePendingChanges();
    }

    checkResetVitaIcon() {
        this.shouldResetVitaIcon = this.metadataForm.controls.resetVitaIcon.getRawValue();
        this.doesPageHavePendingChanges();
    }

    checkResetBetaIcon() {
        this.shouldResetBetaIcon = this.metadataForm.controls.resetBetaIcon.getRawValue();
        this.doesPageHavePendingChanges();
    }

    checkUsernameChanges() {
        this.hasUsernameChanged = this.metadataForm.controls.username.getRawValue() !== this.targetUser?.username;
        this.doesPageHavePendingChanges();
    }

    checkDescriptionChanges() {
        this.hasDescriptionChanged = this.metadataForm.controls.description.getRawValue() !== this.targetUser?.description;
        this.doesPageHavePendingChanges();
    }

    setRole(input: UserRoles) {
        this.metadataForm.controls.role.setValue(input);
        this.hasRoleChanged = input !== this.targetUser!.role;
        this.doesPageHavePendingChanges();
    }

    roleDropdownButtonClick() {
        this.showRoleMenu = !this.showRoleMenu;
    }

    private doesPageHavePendingChanges() {
        this.hasPendingChanges =
            this.hasDescriptionChanged
            || this.hasUsernameChanged
            || this.hasRoleChanged
            || this.shouldResetIcon
            || this.shouldResetVitaIcon
            || this.shouldResetBetaIcon;
    }

    private updateInputs(user: ExtendedUser) {
        this.targetUser = user;
        this.hasPendingChanges = false;

        this.shouldResetIcon = false;
        this.shouldResetVitaIcon = false;
        this.shouldResetBetaIcon = false;

        this.hasDescriptionChanged = false;
        this.hasUsernameChanged = false;
        this.hasRoleChanged = false;

        this.metadataForm.controls.resetIcon.setValue(false);
        this.metadataForm.controls.resetVitaIcon.setValue(false);
        this.metadataForm.controls.resetBetaIcon.setValue(false);
        
        this.metadataForm.controls.description.setValue(user.description);
        this.metadataForm.controls.username.setValue(user.username);
        this.metadataForm.controls.role.setValue(user.role);
    }

    uploadChanges() {
        if (!this.hasPendingChanges) return;
        if (!this.targetUser) return;

        let request: AdminUserUpdateRequest = {
            role: this.hasRoleChanged ? this.metadataForm.controls.role.getRawValue() : null,
            username: this.hasUsernameChanged ? this.metadataForm.controls.username.getRawValue() : null,
            description: this.hasDescriptionChanged ? this.metadataForm.controls.description.getRawValue() : null,

            iconHash: this.shouldResetIcon ? "0" : null,
            vitaIconHash: this.shouldResetVitaIcon ? "0" : null,
            betaIconHash: this.shouldResetBetaIcon ? "0" : null,
        };

        this.client.updateUserByUuid(this.targetUser.userId, request).subscribe({
            error: error => {
                const apiError: RefreshApiError | undefined = error.error?.error;
                this.banner.warn("Failed to update this user", apiError == null ? error.message : apiError.message);
            },
            next: response => {
                this.updateInputs(response);
            }
        })
    }

    protected readonly faPencil = faPencil;
    protected readonly faFloppyDisk = faFloppyDisk;
    protected readonly faTrash = faTrash;
    protected readonly faChevronDown = faChevronDown;
    protected readonly faChevronUp = faChevronUp;
    protected readonly faUser = faUser;
}