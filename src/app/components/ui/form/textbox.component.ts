import {Component, Input} from '@angular/core';
import {IconProp} from "@fortawesome/fontawesome-svg-core";
import {FaIconComponent} from "@fortawesome/angular-fontawesome";
import {FormGroup, ReactiveFormsModule} from "@angular/forms";

@Component({
  selector: 'app-textbox',
  standalone: true,
  imports: [
    FaIconComponent,
    ReactiveFormsModule
  ],
  template: `
    <label [for]=ctrlName class="text-sm">{{label}}</label>
    <div [formGroup]="form" class="group rounded px-4 py-1.5 bg-teritary focus-within:outline-2 focus-within:outline focus-within:outline-secondary-bright max-w-fit">
      <fa-icon [icon]="icon" class="text-secondary mr-2 group-focus-within:text-secondary-bright"></fa-icon>
      <input type="text" [id]=ctrlName [formControlName]="ctrlName" [placeholder]="placeholder" class="outline-none bg-teritary placeholder:text-secondary" [required]="required">
    </div>
  `
})
export class TextboxComponent {
  @Input({required: true}) label: string = "";
  @Input() placeholder: string = this.label;
  @Input({required: true}) icon: IconProp = null!;

  @Input({required: true}) form: FormGroup = null!;
  @Input({required: true}) ctrlName: string = "";

  @Input() required: boolean = true;

  // bg-teritary focus-within:text-secondary-bright text-secondary px-5 py-2 rounded
  // drop-shadow-lg flex focus-within:outline-secondary-bright focus-within:outline-2 focus-within:outline
}
