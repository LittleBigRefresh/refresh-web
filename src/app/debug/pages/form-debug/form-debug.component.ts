import { Component } from '@angular/core';
import {PageTitleComponent} from "../../../components/ui/text/page-title.component";
import {FormComponent} from "../../../components/ui/form/form.component";
import {ButtonSubmitFormComponent} from "../../../components/ui/form/button-submit-form.component";
import {TextboxComponent} from "../../../components/ui/form/textbox.component";
import {faPencil} from "@fortawesome/free-solid-svg-icons";
import {FormControl, FormGroup, ReactiveFormsModule} from "@angular/forms";

@Component({
  selector: 'app-form-debug',
  standalone: true,
  imports: [
    PageTitleComponent,
    FormComponent,
    ButtonSubmitFormComponent,
    TextboxComponent,
    ReactiveFormsModule
  ],
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
