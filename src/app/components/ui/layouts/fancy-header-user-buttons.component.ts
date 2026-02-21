import { Component, Input, TemplateRef, ViewChild } from "@angular/core";
import { BannerService } from "../../../banners/banner.service";
import { ExtendedUser } from "../../../api/types/users/extended-user";
import { ClientService } from "../../../api/client.service";
import { ButtonOrNavItemComponent } from "../form/button-or-navitem.component";
import { faHeart, faHeartCrack } from "@fortawesome/free-solid-svg-icons";
import { FancyHeaderButtonsComponent } from "./fancy-header-buttons.component";
import { User } from "../../../api/types/users/user";
import { UserRelations } from "../../../api/types/users/user-relations";
import { RefreshApiError } from "../../../api/refresh-api-error";

@Component({
    selector: 'app-fancy-header-user-buttons',
    imports: [
    ButtonOrNavItemComponent,
    FancyHeaderButtonsComponent,
],
    template: `
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
    
    buttonTemplateRefs: TemplateRef<any>[] = [];
    buttonsInitialized: boolean = false;

    constructor(private client: ClientService, private bannerService: BannerService) {}

    ngAfterViewInit() {
        // Heart Button
        if (this.ownUser.userId !== this.targetUser.userId) {
            this.buttonTemplateRefs.push(this.heartButtonTemplateRef);
        }

        // TODO: Other buttons, such as an edit button for mods

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
}