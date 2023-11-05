import {Component} from '@angular/core';
import {sha512Async} from "../../hash";
import {PasswordVerificationService} from "../../services/password-verification.service";
import {
    faEnvelope,
    faKey,
    faSignIn,
    faTriangleExclamation,
    faUser,
    faUserPlus
} from "@fortawesome/free-solid-svg-icons";
import {AuthService} from "../../api/auth.service";

@Component({
    selector: 'app-register',
    templateUrl: './register.component.html'
})
export class RegisterComponent {
    username: string = "";
    email: string = "";
    password: string = "";
    confirmPassword: string = "";

    constructor(private authService: AuthService, private passwordVerifier: PasswordVerificationService) {
    }

    register() {
        if (!this.passwordVerifier.verifyPassword(this.username, this.password, this.username, this.confirmPassword)) {
            return;
        }

        sha512Async(this.password).then((hash) => {
            this.authService.Register(this.username, this.email, hash)
        });
    }

    protected readonly faEnvelope = faEnvelope;
    protected readonly faTriangleExclamation = faTriangleExclamation;
    protected readonly faSignIn = faSignIn;
    protected readonly faUser = faUser;
    protected readonly faKey = faKey;
    protected readonly faUserPlus = faUserPlus;
}
