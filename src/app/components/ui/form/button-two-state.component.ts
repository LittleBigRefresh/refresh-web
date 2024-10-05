import {Component, EventEmitter, Input, Output} from '@angular/core';
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
            <app-button [text]="textInactive" [icon]="iconInactive" [color]="colorInactive" [enabled]="enabled" type="submit" (click)="actionInactiveMethod()"></app-button>
        }
        @else {
            <app-button [text]="textActive" [icon]="iconActive" [color]="colorActive" [enabled]="enabled" type="submit" (click)="actionActiveMethod()"></app-button>
        }
    `,
    styles: ``
})
export class ButtonTwoStateComponent {
    @Input({required: true}) state: boolean = false;

    @Input({required: true}) textActive: string = "Activate";
    @Input({required: true}) textInactive: string = "Deactivate";

    @Input() iconActive: IconProp | undefined;
    @Input() iconInactive: IconProp | undefined;

    @Input() colorActive: string = "bg-primary";
    @Input() colorInactive: string = "bg-secondary";

    @Input() enabled: boolean = true;
    
    // actions
    @Output() actionActive: EventEmitter<null> = new EventEmitter();
    @Output() actionInactive: EventEmitter<null> = new EventEmitter();


    actionActiveMethod(): void {
        this.actionActive.emit();
    }

    actionInactiveMethod(): void {
        this.actionInactive.emit();
    }
}