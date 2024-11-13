import { Component, Input } from "@angular/core";
import { IconProp } from "@fortawesome/fontawesome-svg-core";
import { NavbarItemComponent } from "../header/navbar-item.component";
import { NavbarItemTwoStateComponent } from "../header/navbar-item-two-state.component";
import { ButtonComponent } from "./button.component";
import { ButtonTwoStateComponent } from "./button-two-state.component";

@Component({
    selector: 'app-button-or-navitem',
    standalone: true,
    imports: [
        NavbarItemComponent,
        NavbarItemTwoStateComponent,
        ButtonComponent,
        ButtonTwoStateComponent
    ],
    template: `
    <!--          NavItem          -->
        @if (isNavItem) {
            @if (state != undefined) {
                <app-navbar-item-two-state
                    [state]="state"
                    [title]="finalText"
                    [icon]="icon"

                    [titleAlternative]="finalTextAlt"
                    [iconAlternative]="iconAlt"
                    
                    [labelClass]="labelClass"
                    [iconClass]="iconClass"> 
                </app-navbar-item-two-state>
            }
            @else {
                <app-navbar-item
                    [title]="finalText"
                    [icon]="icon"
                    [href]="route"
                    
                    [labelClass]="labelClass"
                    [iconClass]="iconClass">
                </app-navbar-item>
            }
        }
    <!--          Button          -->
        @else {
            @if (state != undefined) {
                <app-button-two-state
                    [state]="state"
                    [text]="finalText"
                    [icon]="icon"
                    [color]="color"

                    [textAlternative]="finalTextAlt"
                    [iconAlternative]="iconAlt"
                    [colorAlternative]="colorAlt">
                </app-button-two-state>
            }
            @else {
                <app-button
                    [text]="finalText"
                    [icon]="icon"
                    [color]="color"
                    [routerLink]="route">
                </app-button>
            }    
        }
    `,
    styles: ``
})

export class ButtonOrNavItemComponent {
    @Input() text: string = ""
    @Input() textAlt: string = ""

    @Input() icon: IconProp | undefined;
    @Input() iconAlt: IconProp | undefined;

    @Input() color: string = ""
    @Input() colorAlt: string = ""

    @Input() state: boolean | undefined;
    @Input() route: string | undefined;
    @Input() hasText: boolean = true;
    @Input() isNavItem: boolean = false;

    @Input() labelClass: string = "text-lg";
    @Input() iconClass: string = "w-4 text-[1.1rem]";

    finalText: string = "";
    finalTextAlt: string = "";


    ngOnInit() {
        this.initText();
    }

    initText() {
        if (this.hasText) {
            this.finalText = this.text;
            if (this.state != undefined) {
                this.finalTextAlt = this.textAlt;
            }
        }
    }
}