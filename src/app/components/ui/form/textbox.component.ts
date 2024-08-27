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
    @if (label.length > 0) {
      <label [for]=ctrlName class="text-sm">{{label}}</label>
    }
    <div [formGroup]="form" class="min-w-full flex group rounded-full px-4 py-1.5 bg-teritary focus-within:outline-2 focus-within:outline focus-within:outline-secondary-bright max-w-fit text-nowrap transition-[outline]">
      <fa-icon [icon]="icon" class="text-gentle mr-2 group-focus-within:text-secondary-bright transition-colors"></fa-icon>
      <input [type]="type" [id]=ctrlName [formControlName]="ctrlName" [placeholder]="placeholder" class="grow outline-none bg-teritary placeholder:text-gentle placeholder:italic" [required]="required">
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
  @Input() type: string = "text";
}
