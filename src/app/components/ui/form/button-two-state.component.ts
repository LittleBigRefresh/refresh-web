import {Component, Input} from '@angular/core';
import {ButtonComponent} from "./button.component";
import {IconProp} from "@fortawesome/fontawesome-svg-core";

@Component({
    selector: 'app-button-two-state',
    standalone: true,
    imports: [
        ButtonComponent
    ],
    template: `
        @if (state) {
            <app-button [text]="textAlternative!" [icon]="iconAlternative" [color]="colorAlternative" [enabled]="enabled"></app-button>
        }
        @else {
            <app-button [text]="text" [icon]="icon" [color]="color" [enabled]="enabled"></app-button>
        }
    `,
    styles: ``
})
export class ButtonTwoStateComponent {
    @Input({required: true}) state: boolean = false;

    @Input({required: true}) text: string = "Activate";
    @Input({required: true}) textAlternative: string = "Deactivate";

    @Input() icon: IconProp | undefined;
    @Input() iconAlternative: IconProp | undefined;

    @Input() color: string = "bg-primary";
    @Input() colorAlternative: string = "bg-secondary";

    @Input() enabled: boolean = true;
}