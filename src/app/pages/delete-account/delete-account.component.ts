import {Component} from '@angular/core';
import {AuthService} from "../../api/auth.service";
import { sha512Async } from 'src/app/hash';
import { faKey } from '@fortawesome/free-solid-svg-icons';
import { FormHandler } from 'src/app/helpers/FormHandler';

@Component({
    selector: 'app-delete-account',
    templateUrl: './delete-account.component.html'
})
export class DeleteAccountComponent extends FormHandler {
    password: string = "";

    constructor(private authService: AuthService) {
        super();
    }

    delete(): void {
        const formInputs = this.cleanUpFormInputs(this.password);
        const [password] = formInputs;

        sha512Async(password).then((hash) => {
            this.authService.DeleteAccount(hash);
        });
    }

    protected readonly window = window;
    protected readonly faKey = faKey;
}
