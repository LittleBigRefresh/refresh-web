import { Component, Input, TemplateRef, ViewChild, ViewContainerRef } from "@angular/core";
import { ButtonComponent } from "../form/button.component";
import {faEllipsisV, faXmark} from "@fortawesome/free-solid-svg-icons";
import { DropdownMenuComponent } from "../form/dropdown-menu.component";

@Component({
    selector: 'app-fancy-header-buttons',
    imports: [
    ButtonComponent,
    DropdownMenuComponent
],
    template: `
        <ng-template #moreButtonTemplate>
            <app-button
                text=""
                [icon]="showMenu ? faXmark : faEllipsisV"
                color="bg-secondary"
                (click)="moreButtonClick()"> 
            </app-button>
        </ng-template>

        <app-dropdown-menu class="flex flex-row justify-end" [showMenu]="showMenu" offsets="top-9" [width]="48">
            <div trigger #firstButtonContainer></div>
            <div trigger #secondButtonContainer></div>
            <div content #navItemsContainer></div>
        </app-dropdown-menu>
    `,
    styles: ``
})

export class FancyHeaderButtonsComponent {
    @Input({required: true}) public buttonTemplateRefs: TemplateRef<any>[] = undefined!;
    @ViewChild('moreButtonTemplate') moreButtonTemplateRef!: TemplateRef<any>;

    @ViewChild('firstButtonContainer', { read: ViewContainerRef }) firstButtonContainerRef!: ViewContainerRef;
    @ViewChild('secondButtonContainer', { read: ViewContainerRef }) secondButtonContainerRef!: ViewContainerRef;
    @ViewChild('navItemsContainer', { read: ViewContainerRef }) navItemsContainerRef!: ViewContainerRef;

    showMenu: boolean = false;

    ngAfterViewInit() {
        // place buttons (or navitems) depending on how many there are in the array
        if (this.buttonTemplateRefs.length > 0) {
            this.firstButtonContainerRef.createEmbeddedView(this.buttonTemplateRefs[0], {hasText: true, isNavItem: false});

            if (this.buttonTemplateRefs.length == 2) {
                this.secondButtonContainerRef.createEmbeddedView(this.buttonTemplateRefs[1], {hasText: false, isNavItem: false});
            }

            else if (this.buttonTemplateRefs.length > 2) {
                this.secondButtonContainerRef.createEmbeddedView(this.moreButtonTemplateRef);

                let index: number = 0;
                for (let containerRef of this.buttonTemplateRefs) {
                    if (index > 0) {
                        this.navItemsContainerRef.createEmbeddedView(containerRef, {hasText: true, isNavItem: true});
                    }
                    index++;
                }
            }
        }
    }

    async moreButtonClick() {
        this.showMenu = !this.showMenu;
    }

    protected readonly faEllipsisV = faEllipsisV;
    protected readonly faXmark = faXmark;
}