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
    faPlay
} from "@fortawesome/free-solid-svg-icons";
import { FancyHeaderButtonsComponent } from "./fancy-header-buttons.component";

@Component({
    selector: 'app-fancy-header-level-buttons',
    standalone: true,
    imports: [
        ButtonOrNavItemComponent,
        FancyHeaderButtonsComponent
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

        <div>
            @if (buttonsInitialized) {
                <app-fancy-header-buttons [buttonTemplateRefs]="buttonTemplateRefs"></app-fancy-header-buttons>
            }
        </div>    
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
    
    buttonTemplateRefs: TemplateRef<any>[] = [];
    ownUserRoom: Room | undefined;
    buttonsInitialized: boolean = false;

    constructor(private client: ClientService, private bannerService: BannerService) {}

    ngAfterViewInit() {
        // Play Now button, if level is compatible with the game currently played by the player
        this.ownUserRoom = this.ownUser.activeRoom;
        if (this.ownUserRoom != undefined && this.areGameVersionsCompatible(this.level.gameVersion, this.ownUserRoom.game)) {
            this.buttonTemplateRefs.push(this.playNowButtonTemplateRef);
        }
        
        // Queue button, if level is user generated and not from LBP PSP
        if (this.level.slotType == 0 && this.level.gameVersion != 4) { 
            this.buttonTemplateRefs.push(this.queueButtonTemplateRef);
        } 

        // Heart Button
        this.buttonTemplateRefs.push(this.heartButtonTemplateRef);

        this.buttonsInitialized = true;
    }

    areGameVersionsCompatible(levelGameVersion: number, userGameVersion: number) {
        // if level is from lbp1 and user is on lbp2 or 3
        if (levelGameVersion == 0 && userGameVersion == (1 || 2)) return true;

        // if level is from lbp2 and user is on lbp3
        if (levelGameVersion == 1 && userGameVersion == 2) return true;

        // if level game version is the same as users game version
        if (levelGameVersion == userGameVersion) return true;

        // else
        return false;
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
}