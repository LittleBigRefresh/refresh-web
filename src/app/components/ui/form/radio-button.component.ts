import {Component, Input} from '@angular/core';
import {FormGroup, ReactiveFormsModule} from "@angular/forms";

@Component({
    selector: 'app-radio-button',
    imports: [
        ReactiveFormsModule
    ],
    template: `
        <div [formGroup]="form" class="min-w-full flex flex-row content-center justify-start rounded-md px-2 py-1 hover-within:outline-2 hover-within:outline hover-within:outline-secondary-bright max-w-fit transition-[outline]">
            <input type="radio" [id]=id [formControlName]="ctrlName" [name]="ctrlName" [value]=value class="outline-hidden bg-teritary placeholder:text-gentle placeholder:italic" [required]="required">
            
            @if (label.length > 0) {
                <label [for]=id class="text-base hyphens-manual ml-3">{{label}}</label>
            }
        </div>
    `
})
export class RadioButtonComponent {
  @Input({required: true}) label: string = "";

  @Input({required: true}) form: FormGroup = null!;
  @Input({required: true}) ctrlName: string = "";
  @Input({required: true}) value: number = -1;
  @Input({required: true}) id: string = "";

  @Input() required: boolean = true;
}
