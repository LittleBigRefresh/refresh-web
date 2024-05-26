import { Component } from '@angular/core';
import {FormsModule} from "@angular/forms";
import {ButtonGroupComponent} from "./button-group.component";

@Component({
  selector: 'app-form',
  standalone: true,
  imports: [
    FormsModule,
    ButtonGroupComponent
  ],
  template: `
    <form (ngSubmit)="submit()">
      <app-button-group>
        <ng-content select="[buttons]"></ng-content>
      </app-button-group>
    </form>
  `
})
export class FormComponent {
  submit() {

  }
}
