import {Component} from '@angular/core';
import {sha512Async} from 'src/app/hash';
import {PasswordVerificationService} from "../../services/password-verification.service";
import {faEnvelope, faKey, faSignIn, faUserPlus} from "@fortawesome/free-solid-svg-icons";
import {AuthService} from "../../api/auth.service";

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html'
})
export class LoginComponent {
    email: string = "";
    password: string = "";

    constructor(private authService: AuthService, private passwordVerifier: PasswordVerificationService) {
    }

    login() {
        if (!this.passwordVerifier.verifyPassword(this.email, this.password)) {
            return;
        }

        sha512Async(this.password).then((hash) => {
            this.authService.LogIn(this.email, hash)
        });
    }

    protected readonly faEnvelope = faEnvelope;
    protected readonly faKey = faKey;
    protected readonly faSignIn = faSignIn;
    protected readonly faUserPlus = faUserPlus;
}
