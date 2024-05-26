import {Component, EventEmitter, Input, Output} from '@angular/core';
import {FormGroup, FormsModule, ReactiveFormsModule} from "@angular/forms";
import {ButtonGroupComponent} from "./button-group.component";
import {DividerComponent} from "../divider.component";
import {NgIf} from "@angular/common";

@Component({
  selector: 'app-form',
  standalone: true,
  imports: [
    FormsModule,
    ButtonGroupComponent,
    DividerComponent,
    ReactiveFormsModule,
    NgIf
  ],
  template: `
    <form (ngSubmit)="submit.emit(null);" [formGroup]="form">
      <ng-content></ng-content>

      <app-divider *ngIf="!compact"></app-divider>

      <app-button-group>
        <ng-content select="[buttons]"></ng-content>
      </app-button-group>
    </form>
  `
})
export class FormComponent {
  @Input({required: true}) form: FormGroup = null!;
  @Output() submit: EventEmitter<null> = new EventEmitter();
  @Input() compact: boolean = false;
}
