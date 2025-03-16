import {Component, EventEmitter, Input, Output} from '@angular/core';
import {FormGroup, FormsModule, ReactiveFormsModule} from "@angular/forms";
import {ButtonGroupComponent} from "./button-group.component";
import {DividerComponent} from "../divider.component";


@Component({
  selector: 'app-form',
  standalone: true,
  imports: [
    FormsModule,
    ButtonGroupComponent,
    DividerComponent,
    ReactiveFormsModule
],
  template: `
    <form (ngSubmit)="submitEvent.emit(null);" [formGroup]="form">
      <ng-content></ng-content>
    
      @if (!compact) {
        <app-divider></app-divider>
      }
    
      <app-button-group>
        <ng-content select="[buttons]"></ng-content>
      </app-button-group>
    </form>
    `
})
export class FormComponent {
  @Input({required: true}) form: FormGroup = null!;
  @Output() submitEvent: EventEmitter<null> = new EventEmitter();
  @Input() compact: boolean = false;
}
