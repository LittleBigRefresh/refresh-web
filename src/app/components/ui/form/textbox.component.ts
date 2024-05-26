import {Component, Input} from '@angular/core';
import {IconProp} from "@fortawesome/fontawesome-svg-core";
import {FaIconComponent} from "@fortawesome/angular-fontawesome";
import {FormGroup, ReactiveFormsModule} from "@angular/forms";
import {NgIf} from "@angular/common";

@Component({
  selector: 'app-textbox',
  standalone: true,
  imports: [
    FaIconComponent,
    ReactiveFormsModule,
    NgIf
  ],
  template: `
    <label [for]=ctrlName class="text-sm" *ngIf="label.length > 0">{{label}}</label>
    <div [formGroup]="form" class="group rounded px-4 py-1.5 bg-teritary focus-within:outline-2 focus-within:outline focus-within:outline-secondary-bright max-w-fit text-nowrap">
      <fa-icon [icon]="icon" class="text-secondary mr-2 group-focus-within:text-secondary-bright"></fa-icon>
      <input type="text" [id]=ctrlName [formControlName]="ctrlName" [placeholder]="placeholder" class="outline-none bg-teritary placeholder:text-secondary" [required]="required">
    </div>
  `
})
export class TextboxComponent {
  @Input() label: string = "";
  @Input() placeholder: string = this.label;
  @Input({required: true}) icon: IconProp = null!;

  @Input({required: true}) form: FormGroup = null!;
  @Input({required: true}) ctrlName: string = "";

  @Input() required: boolean = true;
}
