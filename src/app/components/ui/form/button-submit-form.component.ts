import {Component, Input} from '@angular/core';
import {ButtonComponent} from "./button.component";
import {faCheckCircle} from "@fortawesome/free-solid-svg-icons";
import {FormGroup} from "@angular/forms";

@Component({
  selector: 'app-button-submit-form',
  standalone: true,
  imports: [
    ButtonComponent
  ],
  template: `
    <app-button [text]="action" [icon]="faCheckCircle" color="bg-primary" type="submit" [enabled]="form.status == 'VALID'"></app-button>
  `,
  styles: ``
})
export class ButtonSubmitFormComponent {
  @Input({required: true}) form: FormGroup = null!;
  @Input() action: string = "Submit";
  protected readonly faCheckCircle = faCheckCircle;
}
