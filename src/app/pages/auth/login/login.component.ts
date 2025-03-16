import { Component } from '@angular/core';
import {FormControl, FormGroup} from "@angular/forms";
import {faEnvelope, faKey} from '@fortawesome/free-solid-svg-icons';
import {PageTitleComponent} from "../../../components/ui/text/page-title.component";
import {FormComponent} from "../../../components/ui/form/form.component";
import {TextboxComponent} from "../../../components/ui/form/textbox.component";
import {ButtonSubmitFormComponent} from "../../../components/ui/form/button-submit-form.component";
import {AuthenticationService} from "../../../api/authentication.service";
import {sha512Async} from "../../../helpers/crypto";

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    PageTitleComponent,
    FormComponent,
    TextboxComponent,
    ButtonSubmitFormComponent
  ],
  templateUrl: './login.component.html'
})
export class LoginComponent {
  form = new FormGroup({
    emailAddress: new FormControl(),
    password: new FormControl()
  });
  
  constructor(private auth: AuthenticationService) {}

  submit() {
    const emailAddress: string = this.form.controls.emailAddress.getRawValue();
    const password: string = this.form.controls.password.getRawValue();
    
    sha512Async(password).then(passwordSha512 => {
      this.auth.LogIn(emailAddress, passwordSha512, true);
    })
  }

  protected readonly faEnvelope = faEnvelope;
  protected readonly faKey = faKey;
}
