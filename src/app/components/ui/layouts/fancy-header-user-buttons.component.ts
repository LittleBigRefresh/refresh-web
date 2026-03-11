import { Component, Input, TemplateRef, ViewChild } from "@angular/core";
import { BannerService } from "../../../banners/banner.service";
import { ExtendedUser } from "../../../api/types/users/extended-user";
import { ClientService } from "../../../api/client.service";
import { ButtonOrNavItemComponent } from "../form/button-or-navitem.component";
import { faHeart, faHeartCrack, faPencil } from "@fortawesome/free-solid-svg-icons";
import { FancyHeaderButtonsComponent } from "./fancy-header-buttons.component";
import { User } from "../../../api/types/users/user";
import { UserRelations } from "../../../api/types/users/user-relations";
import { RefreshApiError } from "../../../api/refresh-api-error";
import { UserRoles } from "../../../api/types/users/user-roles";
import { Router } from "@angular/router";

@Component({
    selector: 'app-fancy-header-user-buttons',
    imports: [
    ButtonOrNavItemComponent,
    FancyHeaderButtonsComponent,
],
    template: `
        <ng-template #moderateButtonTemplate let-templateHasText="hasText" let-templateIsNavItem="isNavItem">
            <app-button-or-navitem
                text="Moderate"
                [icon]="faPencil"
                color="bg-blue"

                (click)="this.router.navigate(['/u/', targetUser.userId, 'settings'])"

                [hasText]="templateHasText"
                [isNavItem]="templateIsNavItem"> 
            </app-button-or-navitem>
        </ng-template>

        <ng-template #heartButtonTemplate let-templateHasText="hasText" let-templateIsNavItem="isNavItem">
            <app-button-or-navitem
                text="Heart"
                [icon]="faHeart"
                color="bg-pink"
            
                textAlt="Unheart"
                [iconAlt]="faHeartCrack"
                colorAlt="bg-secondary"

                [state]="relations.isHearted"
                (click)="heartButtonClick()"

                [hasText]="templateHasText"
                [isNavItem]="templateIsNavItem"> 
            </app-button-or-navitem>
        </ng-template>

        @if (buttonsInitialized) {
            <app-fancy-header-buttons 
                [buttonTemplateRefs]="buttonTemplateRefs">
            </app-fancy-header-buttons>
        }
    `,
    styles: ``
})

export class FancyHeaderUserButtonsComponent {
    @Input({required: true}) public targetUser: User = undefined!;
    @Input({required: true}) public ownUser: ExtendedUser = undefined!;
    @Input({required: true}) public relations: UserRelations = undefined!;

    @ViewChild('heartButtonTemplate') heartButtonTemplateRef!: TemplateRef<any>;
    @ViewChild('moderateButtonTemplate') moderateButtonTemplateRef!: TemplateRef<any>;
    
    buttonTemplateRefs: TemplateRef<any>[] = [];
    buttonsInitialized: boolean = false;

    constructor(private client: ClientService, private bannerService: BannerService, protected router: Router) {}

    ngAfterViewInit() {
        // FIXME: these buttons, weirdly, sometimes don't appear on user pages, but refreshing the page makes them appear again.
        // Moderate Button
        if (this.ownUser.role === UserRoles.Admin || (this.ownUser.role >= UserRoles.Moderator && this.targetUser.role < UserRoles.Moderator)) {
            this.buttonTemplateRefs.push(this.moderateButtonTemplateRef);
        }

        // Heart Button
        if (this.ownUser.userId !== this.targetUser.userId) {
            this.buttonTemplateRefs.push(this.heartButtonTemplateRef);
        }

        this.buttonsInitialized = true;
    }

    async heartButtonClick() {
        if (this.relations.isHearted) {
            this.client.setUserAsUnhearted(this.targetUser.userId).subscribe({
                error: error => {
                    const apiError: RefreshApiError | undefined = error.error?.error;
                    this.bannerService.warn("Failed to unheart user", apiError == null ? error.message : apiError.message);
                },
                next: _ => {
                    this.relations.isHearted = false;
                    this.targetUser.statistics.favourites--;
                }
            });
        }
        else {
            this.client.setUserAsHearted(this.targetUser.userId).subscribe({
                error: error => {
                    const apiError: RefreshApiError | undefined = error.error?.error;
                    this.bannerService.warn("Failed to heart user", apiError == null ? error.message : apiError.message);
                },
                next: _ => {
                    this.relations.isHearted = true;
                    this.targetUser.statistics.favourites++;
                }
            });
        }
    }

    protected readonly faHeart = faHeart; 
    protected readonly faHeartCrack = faHeartCrack;
    protected readonly faPencil = faPencil;
}