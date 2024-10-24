import { Component, Input, TemplateRef, ViewChild, ViewContainerRef } from "@angular/core";
import { BannerService } from "../../../banners/banner.service";
import { Level } from "../../../api/types/levels/level";
import { ExtendedUser } from "../../../api/types/users/extended-user";
import { ClientService } from "../../../api/client.service";
import { Room } from "../../../api/types/rooms/room";
import { ButtonComponent } from "../form/button.component";
import { NavbarItemComponent } from "../header/navbar-item.component";
import { NgClass, NgTemplateOutlet } from "@angular/common";
import { ButtonOrNavItem } from "../form/button-or-navitem.component";
import {
    faEllipsisV,
    faBell, 
    faBellSlash, 
    faHeart, 
    faHeartCrack, 
    faPlay 
} from "@fortawesome/free-solid-svg-icons";
import { LayoutService } from "../../../services/layout.service";


@Component({
    selector: 'app-level-header-button-area',
    standalone: true,
    imports: [
        ButtonComponent,
        NavbarItemComponent,
        NgClass,
        ButtonOrNavItem
    ],
    template: `
        <ng-template #playNowButtonTemplate let-templateHasText="hasText" let-templateIsNavItem="isNavItem">
            <app-button-or-navitem
                text="Play Now"
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

                [state]="queueButtonState"
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

                [state]="heartButtonState"
                (click)="heartButtonClick()"

                [hasText]="templateHasText"
                [isNavItem]="templateIsNavItem"> 
            </app-button-or-navitem>
        </ng-template>

        <ng-template #decoyButtonTemplate let-templateHasText="hasText" let-templateIsNavItem="isNavItem">
            <app-button-or-navitem
                text="Decoy"
                [icon]="faPlay"
                color="bg-secondary"
                (click)="decoyButtonClick()"
            
                [hasText]="templateHasText"
                [isNavItem]="templateIsNavItem">
            </app-button-or-navitem>
        </ng-template>

        <ng-template #moreButtonTemplate>
            <app-button
                class="peer"
                text=""
                [icon]="faEllipsisV"
                color="bg-secondary"> 
            </app-button>
        </ng-template>
        
        <div class="flex {{isMobile ? 'flex-row-reverse' : 'flex-row'}} justify-end content-center space-x-1 min-w-56 group relative">
            <div #firstButtonContainer></div>
            <div #secondButtonContainer></div>
            <div #thirdButtonContainer></div>
            <div class="absolute z-[1] w-48 px-5 py-2.5 rounded bg-header-background border-4 border-backdrop border-solid 
                drop-shadow-xl invisible peer-has-[:focus]:visible active:visible top-10">
                <div class="cursor-pointer flex flex-col gap-y-1.5">
                    <div #remainingButtonContainer>
                </div>
            </div> 
        </div>
    `,
    styles: ``
})

export class FancyHeaderLevelButtonAreaComponent {
    @Input({required: true}) public level: Level = undefined!;
    @Input({required: true}) public ownUser: ExtendedUser = undefined!;
    @Input() public isMobile: boolean = false;

    @ViewChild('firstButtonContainer', { read: ViewContainerRef }) firstButtonContainerRef!: ViewContainerRef;
    @ViewChild('secondButtonContainer', { read: ViewContainerRef }) secondButtonContainerRef!: ViewContainerRef;
    @ViewChild('thirdButtonContainer', { read: ViewContainerRef }) thirdButtonContainerRef!: ViewContainerRef;
    @ViewChild('remainingButtonContainer', { read: ViewContainerRef }) remainingButtonContainerRef!: ViewContainerRef;

    @ViewChild('playNowButtonTemplate') playNowButtonTemplateRef!: TemplateRef<any>;
    @ViewChild('queueButtonTemplate') queueButtonTemplateRef!: TemplateRef<any>;
    @ViewChild('heartButtonTemplate') heartButtonTemplateRef!: TemplateRef<any>;
    //@ViewChild('decoyButtonTemplate') decoyButtonTemplateRef!: TemplateRef<any>;
    @ViewChild('moreButtonTemplate') moreButtonTemplateRef!: TemplateRef<any>;
    buttonTemplateRefs: TemplateRef<any>[] = [];

    heartButtonState: boolean = false;
    queueButtonState: boolean = false;
    ownUserRoom: Room | undefined;


    constructor(private bannerService: BannerService, private client: ClientService, protected layout: LayoutService) {}

    ngAfterViewInit() {
        // Play Now button, if level is compatible with the game currently played by the player
        this.ownUserRoom = this.ownUser.activeRoom;
        if(this.ownUserRoom != undefined && this.areGameVersionsCompatible(this.level.gameVersion, this.ownUserRoom.game)) {
            this.buttonTemplateRefs.push(this.playNowButtonTemplateRef);
        }

        // Queue button, if level is user generated and not from LBP PSP
        if(this.level.slotType == 0 && this.level.gameVersion != 4) { 
            this.buttonTemplateRefs.push(this.queueButtonTemplateRef);
            this.queueButtonState = this.level.isQueued;
        } 
        
        // Heart Button
        this.buttonTemplateRefs.push(this.heartButtonTemplateRef);
        this.heartButtonState = this.level.isHearted;

        // Decoy button
        //this.buttonTemplateRefs.push(this.decoyButtonTemplateRef);
        

        // place buttons (or navitems) depending on how many there are in the array
        if(this.buttonTemplateRefs.length > 0) {
            this.firstButtonContainerRef.createEmbeddedView(this.buttonTemplateRefs[0], {hasText: true, isNavItem: false});

            if(this.buttonTemplateRefs.length > 1) {
                this.secondButtonContainerRef.createEmbeddedView(this.buttonTemplateRefs[1], {hasText: false, isNavItem: false});
            }

            if(this.buttonTemplateRefs.length == 3) {
                this.thirdButtonContainerRef.createEmbeddedView(this.buttonTemplateRefs[2], {hasText: false, isNavItem: false});
            }
            else if(this.buttonTemplateRefs.length > 3) {
                this.thirdButtonContainerRef.createEmbeddedView(this.moreButtonTemplateRef);

                let index: number = 0;
                for(let containerRef of this.buttonTemplateRefs) {
                    if(index > 1) {
                        this.remainingButtonContainerRef.createEmbeddedView(containerRef, {hasText: true, isNavItem: true});
                    }
                    index++;
                }
            }
        }
    }

    areGameVersionsCompatible(levelGameVersion: number, userGameVersion: number) {
        // if level is from lbp1 and user is on lbp2 or 3
        if(levelGameVersion == 0 && userGameVersion == (1 || 2)) return true;

        // if level is from lbp2 and user is on lbp3
        if(levelGameVersion == 1 && userGameVersion == 2) return true;

        // if level game version is the same as users game version
        if(levelGameVersion == userGameVersion) return true;

        // else
        return false;
    }


    async playNowButtonClick() {
        this.client.setLevelAsOverride(this.level.levelId).subscribe(_ => {
            this.bannerService.success("Check your game!", "In LBP, head to 'Lucky Dip' (or any category) and '" + this.level.title + "' should show up!");
        });
    }
    
    async queueButtonClick() {
        if (this.queueButtonState) {
            this.client.setLevelAsDequeued(this.level.levelId).subscribe(_ => {
                this.queueButtonState = false;
            });
        }
        else {
            this.client.setLevelAsQueued(this.level.levelId).subscribe(_ => {
                this.queueButtonState = true;
            });
        }
    }

    async heartButtonClick() {
        if (this.heartButtonState) {
            this.client.setLevelAsUnhearted(this.level.levelId).subscribe(_ => {
                this.heartButtonState = false;
            });
        }
        else {
            this.client.setLevelAsHearted(this.level.levelId).subscribe(_ => {
                this.heartButtonState = true;
            });
        }
    }

    async decoyButtonClick() {
        this.bannerService.success("Congarts!", "You have achieved absolutely nothing! ... probably");
    }

    protected readonly faEllipsisV = faEllipsisV;
    protected readonly faPlay = faPlay;
    protected readonly faBell = faBell; 
    protected readonly faBellSlash = faBellSlash; 
    protected readonly faHeart = faHeart; 
    protected readonly faHeartCrack = faHeartCrack;
}