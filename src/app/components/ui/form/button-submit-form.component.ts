import {Component, Input, ChangeDetectionStrategy} from '@angular/core';
import {ButtonComponent} from "./button.component";
import {faCheckCircle} from "@fortawesome/free-solid-svg-icons";
import {FormGroup} from "@angular/forms";

@Component({
    selector: 'app-button-submit-form',
    imports: [
        ButtonComponent
    ],
    template: `
    <app-button [text]="action" [icon]="faCheckCircle" color="bg-primary" type="submit" [enabled]="form.status == 'VALID'"></app-button>
  `,
    changeDetection: ChangeDetectionStrategy.Eager,
    styles: ``
})
export class ButtonSubmitFormComponent {
  @Input({required: true}) form: FormGroup = null!;
  @Input() action: string = "Submit";
  protected readonly faCheckCircle = faCheckCircle;
}
