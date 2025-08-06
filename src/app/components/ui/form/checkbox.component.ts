import {Component, Input} from '@angular/core';
import {IconProp} from "@fortawesome/fontawesome-svg-core";
import {FaIconComponent} from "@fortawesome/angular-fontawesome";
import {FormGroup, ReactiveFormsModule} from "@angular/forms";

@Component({
    selector: 'app-checkbox',
    imports: [
        FaIconComponent,
        ReactiveFormsModule
    ],
    template: `
        <div [formGroup]="form" class="min-w-full flex flex-row content-center justify-start rounded-md px-2 py-1 hover-within:outline-2 hover-within:outline hover-within:outline-secondary-bright max-w-fit transition-[outline]">
            <input type="checkbox" [id]=ctrlName [formControlName]="ctrlName" class="outline-hidden bg-teritary placeholder:text-gentle placeholder:italic" [required]="required">
            
            @if (label.length > 0) {
                <label [for]=ctrlName class="text-base hyphens-manual ml-3">{{label}}</label>
            }
            @if (icon != null) {
                <fa-icon [icon]="icon" class="text-gentle ml-2 group-focus-within:text-secondary-bright transition-colors"></fa-icon>
            }
        </div>
    `
})
export class CheckboxComponent {
  @Input({required: true}) label: string = "";
  @Input() icon: IconProp | undefined;

  @Input({required: true}) form: FormGroup = null!;
  @Input({required: true}) ctrlName: string = "";

  @Input() required: boolean = true;
}
