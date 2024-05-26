import { Component } from '@angular/core';
import {PageTitleComponent} from "../../../components/ui/text/page-title.component";
import {FormComponent} from "../../../components/ui/form/form.component";
import {ButtonSubmitFormComponent} from "../../../components/ui/form/button-submit-form.component";

@Component({
  selector: 'app-form-debug',
  standalone: true,
  imports: [
    PageTitleComponent,
    FormComponent,
    ButtonSubmitFormComponent
  ],
  templateUrl: './form-debug.component.html'
})
export class FormDebugComponent {

}
