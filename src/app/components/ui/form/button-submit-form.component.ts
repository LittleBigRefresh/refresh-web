import { Component } from '@angular/core';
import {ButtonComponent} from "./button.component";
import {faCheckCircle} from "@fortawesome/free-solid-svg-icons";

@Component({
  selector: 'app-button-submit-form',
  standalone: true,
  imports: [
    ButtonComponent
  ],
  template: `
    <app-button text="Submit" [icon]="faCheckCircle" color="bg-primary"></app-button>
  `,
  styles: ``
})
export class ButtonSubmitFormComponent {

  protected readonly faCheckCircle = faCheckCircle;
}
