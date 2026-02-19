import { Component } from "@angular/core";
import { FormControl, FormGroup, ReactiveFormsModule } from "@angular/forms";
import { faBan, faCancel, faChevronDown, faChevronUp, faFlag, 
    faFloppyDisk, faGavel, faPencil, faSignOutAlt, faTrash, faUser } from "@fortawesome/free-solid-svg-icons";
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
import { PlanetInfo } from "../../../api/types/users/planet-info";
import { LabelComponent } from "../../../components/ui/info/label.component";
import { PunishUserRequest } from "../../../api/types/moderation/punish-user-request";
import { ConfirmationDialogComponent } from "../../../components/ui/confirmation-dialog.component";
import { DarkContainerComponent } from "../../../components/ui/dark-container.component";
import { UserAvatarComponent } from "../../../components/ui/photos/user-avatar.component";

@Component({
    selector: 'app-admin-user-settings',
    imports: [
    AsyncPipe,
    RolePipe,
    CheckboxComponent,
    PageTitleComponent,
    ButtonComponent,
    TextAreaComponent,
    TwoPaneLayoutComponent,
    ContainerComponent,
    PaneTitleComponent,
    DropdownMenuComponent,
    RadioButtonComponent,
    DividerComponent,
    TextboxComponent,
    LabelComponent,
    ConfirmationDialogComponent,
    DarkContainerComponent,
    ReactiveFormsModule,
    UserAvatarComponent
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
    hasPendingMetadataChanges: boolean = false;

    protected adminValue: UserRoles = UserRoles.Admin;
    protected moderatorValue: UserRoles = UserRoles.Moderator;
    protected curatorValue: UserRoles = UserRoles.Curator;
    protected trustedValue: UserRoles = UserRoles.Trusted;
    protected userValue: UserRoles = UserRoles.User;
    protected restrictedValue: UserRoles = UserRoles.Restricted;

    planets: PlanetInfo | undefined;

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
                                next: user => {
                                    if (user) {
                                        this.updateInputs(user);
                                        this.getPlanets(user.userId);
                                    }
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
        this.doesMetadataHavePendingChanges();
    }

    checkResetVitaIcon() {
        this.shouldResetVitaIcon = this.metadataForm.controls.resetVitaIcon.getRawValue();
        this.doesMetadataHavePendingChanges();
    }

    checkResetBetaIcon() {
        this.shouldResetBetaIcon = this.metadataForm.controls.resetBetaIcon.getRawValue();
        this.doesMetadataHavePendingChanges();
    }

    checkUsernameChanges() {
        this.hasUsernameChanged = this.metadataForm.controls.username.getRawValue() !== this.targetUser?.username;
        this.doesMetadataHavePendingChanges();
    }

    checkDescriptionChanges() {
        this.hasDescriptionChanged = this.metadataForm.controls.description.getRawValue() !== this.targetUser?.description;
        this.doesMetadataHavePendingChanges();
    }

    setRole(input: UserRoles) {
        this.metadataForm.controls.role.setValue(input);
        this.hasRoleChanged = input !== this.targetUser!.role;
        this.doesMetadataHavePendingChanges();
    }

    overrideRole(input: UserRoles) {
        if (!this.targetUser) return;
        this.targetUser.role = input;
        this.metadataForm.controls.role.setValue(input);
        this.hasRoleChanged = false;
    }

    roleDropdownButtonClick() {
        this.showRoleMenu = !this.showRoleMenu;
    }

    private doesMetadataHavePendingChanges() {
        this.hasPendingMetadataChanges =
            this.hasDescriptionChanged
            || this.hasUsernameChanged
            || this.hasRoleChanged
            || this.shouldResetIcon
            || this.shouldResetVitaIcon
            || this.shouldResetBetaIcon;
    }

    private updateInputs(user: ExtendedUser) {
        this.targetUser = user;
        this.hasPendingMetadataChanges = false;

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

    protected discardChanges() {
        if (!this.targetUser) return;
        this.updateInputs(this.targetUser);
    }

    uploadChanges() {
        if (!this.hasPendingMetadataChanges) return;
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
                this.banner.success("Successfully updated " + this.targetUser?.username, "");
            }
        })
    }

    private getPlanets(uuid: string) {
        this.client.getUserPlanetDataByUuid(uuid).subscribe({
            error: error => {
                this.planets = undefined;
                const apiError: RefreshApiError | undefined = error.error?.error;
                this.banner.warn("Failed to get planet data", apiError == null ? error.message : apiError.message);
            },
            next: planets => {
                this.planets = planets;
            }
        });
    }

    protected showPlanetResetDialog: boolean = false;

    togglePlanetResetDialog(visibility: boolean) {
        this.showPlanetResetDialog = visibility;
    }

    resetPlanets() {
        if (!this.targetUser) return;
        this.togglePlanetResetDialog(false);

        this.client.resetUserPlanetDataByUuid(this.targetUser.userId).subscribe({
            error: error => {
                const apiError: RefreshApiError | undefined = error.error?.error;
                this.banner.warn("Failed to reset this user's planet data", apiError == null ? error.message : apiError.message);
            },
            next: _ => {
                this.banner.success("Successfully reset " + this.targetUser?.username + "'s planets!", "");
                this.planets = {
                    lbp2PlanetsHash: "0",
                    lbp3PlanetsHash: "0",
                    vitaPlanetsHash: "0",
                    betaPlanetsHash: "0",
                    areLbp2PlanetsModded: false,
                    areLbp3PlanetsModded: false,
                    areVitaPlanetsModded: false,
                    areBetaPlanetsModded: false,
                };
            }
        });
    }

    protected showRestrictionDialog: boolean = false;

    resetPunishmentForm() {
        // No need to reset date, but do reset reason to make it more obvious that the punishment request was successful.
        this.punishmentForm.controls.reason.setValue("");
        this.hasEnteredReason = false;
        this.isPunishmentReady = false;
    }

    toggleRestrictionDialog(visibility: boolean) {
        this.showRestrictionDialog = visibility;
    }

    restrictUser() {
        if (!this.targetUser) return;
        this.waitingForPunishmentResponse = true;
        this.toggleRestrictionDialog(false);

        let punishmentData: PunishUserRequest = {
            reason: this.punishmentForm.controls.reason.getRawValue(),
            // Must wrap this in a new Date, else the timestamp wont include Z, making Bunkum's serializer add its local timezone offset
            // instead of treating the timestamp as UTC. Not only would this modify the actual timestamp, but EF also doesn't
            // support saving timestamps with offsets, so Refresh would throw if it receives a timestamp with either
            // a non-0 offset or one with no offset and no Z.
            expiryDate: new Date(this.punishmentForm.controls.expiryDate.getRawValue()),
        };
        this.client.restrictUserByUuid(this.targetUser.userId, punishmentData).subscribe({
            error: error => {
                this.waitingForPunishmentResponse = false;
                const apiError: RefreshApiError | undefined = error.error?.error;
                this.banner.warn("Failed to restrict this user", apiError == null ? error.message : apiError.message);
            },
            next: _ => {
                this.waitingForPunishmentResponse = false;
                this.overrideRole(UserRoles.Restricted);
                this.resetPunishmentForm();
                this.banner.success("Successfully restricted " + this.targetUser?.username, "");
            }
        });
    }

    protected showBanDialog: boolean = false;

    toggleBanDialog(visibility: boolean) {
        this.showBanDialog = visibility;
    }

    banUser() {
        if (!this.targetUser) return;
        this.waitingForPunishmentResponse = true;
        this.toggleBanDialog(false);

        let punishmentData: PunishUserRequest = {
            reason: this.punishmentForm.controls.reason.getRawValue(),
            expiryDate: new Date(this.punishmentForm.controls.expiryDate.getRawValue()),
        };
        this.client.banUserByUuid(this.targetUser.userId, punishmentData).subscribe({
            error: error => {
                this.waitingForPunishmentResponse = false;
                const apiError: RefreshApiError | undefined = error.error?.error;
                this.banner.warn("Failed to ban this user", apiError == null ? error.message : apiError.message);
            },
            next: _ => {
                this.waitingForPunishmentResponse = false;
                this.overrideRole(UserRoles.Banned);
                this.resetPunishmentForm();
                this.banner.success("Successfully banned " + this.targetUser?.username, "");
            }
        });
    }

    protected showPardonDialog: boolean = false;

    togglePardonDialog(visibility: boolean) {
        this.showPardonDialog = visibility;
    }

    pardonUser() {
        if (!this.targetUser) return;
        this.waitingForPunishmentResponse = true;
        this.togglePardonDialog(false);

        this.client.pardonUserByUuid(this.targetUser.userId).subscribe({
            error: error => {
                this.waitingForPunishmentResponse = false;
                const apiError: RefreshApiError | undefined = error.error?.error;
                this.banner.warn("Failed to pardon this user", apiError == null ? error.message : apiError.message);
            },
            next: _ => {
                this.waitingForPunishmentResponse = false;
                this.overrideRole(UserRoles.User);
                this.banner.success("Successfully pardoned " + this.targetUser?.username, "");
            }
        });
    }

    punishmentForm = new FormGroup({
        reason: new FormControl(),
        expiryDate: new FormControl()
    });

    hasEnteredReason: boolean = false;
    hasEnteredExpiryDate: boolean = false;
    isPunishmentReady: boolean = false;
    waitingForPunishmentResponse = false;

    checkExpiryDateChanges() {
        this.hasEnteredExpiryDate = true;
        this.checkPunishmentReadiness();
    }

    checkReasonChanges() {
        this.hasEnteredReason = this.punishmentForm.controls.reason.getRawValue().length > 0;
        this.checkPunishmentReadiness();
    }

    private checkPunishmentReadiness() {
        this.isPunishmentReady = this.hasEnteredReason && this.hasEnteredExpiryDate;
    }

    protected readonly faPencil = faPencil;
    protected readonly faFloppyDisk = faFloppyDisk;
    protected readonly faTrash = faTrash;
    protected readonly faChevronDown = faChevronDown;
    protected readonly faChevronUp = faChevronUp;
    protected readonly faUser = faUser;
    protected readonly faCancel = faCancel;
    protected readonly faSignOutAlt = faSignOutAlt;
    protected readonly faGavel = faGavel;
    protected readonly faBan = faBan;
    protected readonly faFlag = faFlag;
}