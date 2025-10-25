import { Component, Input, TemplateRef, ViewChild } from "@angular/core";
import { BannerService } from "../../../banners/banner.service";
import { Level } from "../../../api/types/levels/level";
import { ExtendedUser } from "../../../api/types/users/extended-user";
import { ClientService } from "../../../api/client.service";
import { Room } from "../../../api/types/rooms/room";
import { LevelRelations } from "../../../api/types/levels/level-relations";
import { ButtonOrNavItemComponent } from "../form/button-or-navitem.component";
import {
    faBell, 
    faBellSlash, 
    faHeart, 
    faHeartCrack, 
    faPencil, 
    faPlay
} from "@fortawesome/free-solid-svg-icons";
import { FancyHeaderButtonsComponent } from "./fancy-header-buttons.component";
import { areGameVersionsCompatible } from "../../../helpers/game-versioning";
import { UserRoles } from "../../../api/types/users/user-roles";
import { Router } from "@angular/router";
import { SlugPipe } from "../../../pipes/slug.pipe";

@Component({
    selector: 'app-fancy-header-level-buttons',
    imports: [
    ButtonOrNavItemComponent,
    FancyHeaderButtonsComponent,
],
    template: `
        <ng-template #playNowButtonTemplate let-templateHasText="hasText" let-templateIsNavItem="isNavItem">
            <app-button-or-navitem
                text="Play Now!"
                [icon]="faPlay"
                color="bg-primary"
                (click)="playNowButtonClick()"
            
                [hasText]="templateHasText"
                [isNavItem]="templateIsNavItem">
            </app-button-or-navitem>
        </ng-template>

        <ng-template #queueButtonTemplate let-templateHasText="hasText" let-templateIsNavItem="isNavItem">
            <app-button-or-navitem
                text="Queue"
                [icon]="faBell"
                color="bg-yellow"

                textAlt="Dequeue"
                [iconAlt]="faBellSlash"
                colorAlt="bg-secondary"

                [state]="relations.isQueued"
                (click)="queueButtonClick()"

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

        <ng-template #editButtonTemplate let-templateHasText="hasText" let-templateIsNavItem="isNavItem">
            <app-button-or-navitem
                text="Edit"
                [icon]="faPencil"
                color="bg-blue"

                (click)="this.router.navigate(['/level/', level.levelId, levelTitleSlug, 'edit'])"

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

export class FancyHeaderLevelButtonsComponent {
    @Input({required: true}) public level: Level = undefined!;
    @Input({required: true}) public ownUser: ExtendedUser = undefined!;
    @Input({required: true}) public relations: LevelRelations = undefined!;

    @ViewChild('playNowButtonTemplate') playNowButtonTemplateRef!: TemplateRef<any>;
    @ViewChild('queueButtonTemplate') queueButtonTemplateRef!: TemplateRef<any>;
    @ViewChild('heartButtonTemplate') heartButtonTemplateRef!: TemplateRef<any>;
    @ViewChild('editButtonTemplate') editButtonTemplateRef!: TemplateRef<any>;
    
    buttonTemplateRefs: TemplateRef<any>[] = [];
    ownUserRoom: Room | undefined;
    buttonsInitialized: boolean = false;
    levelTitleSlug: string = "title";

    constructor(private client: ClientService, private bannerService: BannerService, 
                protected router: Router, private slug: SlugPipe) {}

    ngAfterViewInit() {
        const isPublisher: boolean = this.level.publisher != null && this.level.publisher.userId == this.ownUser.userId;

        // Edit button at the top, if level is published by the user
        if (isPublisher) { 
            this.buttonTemplateRefs.push(this.editButtonTemplateRef);
        } 

        // Play Now button, if level is compatible with the game currently played by the player
        this.ownUserRoom = this.ownUser.activeRoom;
        if (this.ownUserRoom != undefined && areGameVersionsCompatible(this.level.gameVersion, this.ownUserRoom.game)) {
            this.buttonTemplateRefs.push(this.playNowButtonTemplateRef);
        }

        // Queue button, if level is user generated and not from LBP PSP
        if (this.level.slotType == 0 && this.level.gameVersion != 4) { 
            this.buttonTemplateRefs.push(this.queueButtonTemplateRef);
        } 

        // Heart Button
        this.buttonTemplateRefs.push(this.heartButtonTemplateRef);

        // Edit button further below, if the user is a curator or above and not already the publisher aswell
        if (!isPublisher && this.ownUser.role >= UserRoles.Curator) { 
            this.buttonTemplateRefs.push(this.editButtonTemplateRef);
        } 

        this.levelTitleSlug = this.slug.transform(this.level.title);
        this.buttonsInitialized = true;
    }

    async playNowButtonClick() {
        this.client.setLevelAsOverride(this.level.levelId).subscribe(_ => {
            this.bannerService.success("Check your game!", "In LBP, head to 'Lucky Dip' (or any category) and '" + this.level.title + "' will show up!");
        });
    }
    
    async queueButtonClick() {
        if (this.relations.isQueued) {
            this.client.setLevelAsDequeued(this.level.levelId).subscribe(_ => {
                this.relations.isQueued = false;
            });
        }
        else {
            this.client.setLevelAsQueued(this.level.levelId).subscribe(_ => {
                this.relations.isQueued = true;
            });
        }
    }

    async heartButtonClick() {
        if (this.relations.isHearted) {
            this.client.setLevelAsUnhearted(this.level.levelId).subscribe(_ => {
                this.relations.isHearted = false;
            });
        }
        else {
            this.client.setLevelAsHearted(this.level.levelId).subscribe(_ => {
                this.relations.isHearted = true;
            });
        }
    }

    protected readonly faPlay = faPlay;
    protected readonly faBell = faBell; 
    protected readonly faBellSlash = faBellSlash; 
    protected readonly faHeart = faHeart; 
    protected readonly faHeartCrack = faHeartCrack;
    protected readonly faPencil = faPencil;
}