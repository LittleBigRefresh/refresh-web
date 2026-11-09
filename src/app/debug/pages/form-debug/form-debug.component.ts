import { Component, ChangeDetectionStrategy } from '@angular/core';
import {PageTitleComponent} from "../../../components/ui/text/page-title.component";
import {TextboxComponent} from "../../../components/ui/form/textbox.component";
import {faPencil} from "@fortawesome/free-solid-svg-icons";
import {FormControl, FormGroup, ReactiveFormsModule} from "@angular/forms";
import { ButtonComponent } from '../../../components/ui/form/button.component';
import { DividerComponent } from '../../../components/ui/divider.component';

@Component({
    selector: 'app-form-debug',
    imports: [
        PageTitleComponent,
        TextboxComponent,
        ReactiveFormsModule,
        ButtonComponent,
        DividerComponent
    ],
    changeDetection: ChangeDetectionStrategy.Eager,
    templateUrl: './form-debug.component.html'
})
export class FormDebugComponent {
  form = new FormGroup({
    textbox: new FormControl()
  })

  protected readonly faPencil = faPencil;

  submit() {
    alert(this.form.controls.textbox.getRawValue());
  }
}
