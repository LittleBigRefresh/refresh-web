import {Component, Input} from '@angular/core';
import {IconProp} from "@fortawesome/fontawesome-svg-core";
import {FaIconComponent} from "@fortawesome/angular-fontawesome";
import {FormGroup, ReactiveFormsModule} from "@angular/forms";

@Component({
    selector: 'app-textarea',
    imports: [
    FaIconComponent,
    ReactiveFormsModule
],
    template: `
    @if (label.length > 0) {
      <label [for]=ctrlName class="text-sm">{{label}}</label>
    }
    <div [formGroup]="form" class="min-w-full flex group rounded-md px-4 py-1.5 bg-teritary focus-within:outline-2 focus-within:outline focus-within:outline-secondary-bright max-w-fit text-nowrap transition-[outline]">
      <div class="flex flex-col align-center mr-2 gap-y-2">
        <fa-icon [icon]="icon" class="flex flex-row justify-center mt-1 text-gentle group-focus-within:text-secondary-bright transition-colors"></fa-icon>
        @if (showMaxLength == true) {
          <p>{{maxLength - (form.get(ctrlName)?.value?.length ?? 0)}}</p>
        }
      </div>
      <textarea [id]=ctrlName [formControlName]="ctrlName" [maxLength]="maxLength" [placeholder]="placeholder" [rows]="defaultRowCount"
        class="grow min-w-10 min-h-20 outline-hidden wrap-break-word bg-teritary placeholder:text-gentle placeholder:italic" [required]="required"></textarea>
    </div>
    `
})
export class TextAreaComponent {
  @Input() label: string = "";
  @Input() placeholder: string = this.label;
  @Input({required: true}) icon: IconProp = null!;

  @Input({required: true}) form: FormGroup = null!;
  @Input({required: true}) ctrlName: string = "";

  @Input() required: boolean = true;

  @Input() maxLength: number = 4096;
  @Input() showMaxLength: boolean = false;

  @Input() defaultRowCount: number = 4;
}
