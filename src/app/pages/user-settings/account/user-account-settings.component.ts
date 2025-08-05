import { Component } from "@angular/core";
import { ExtendedUser } from "../../../api/types/users/extended-user";
import { TitleService } from "../../../services/title.service";
import { AuthenticationService } from "../../../api/authentication.service";
import { LayoutService } from "../../../services/layout.service";
import { ClientService } from "../../../api/client.service";
import { AccountUpdateRequest } from "../../../api/types/users/account-update-request";
import { PageTitleComponent } from "../../../components/ui/text/page-title.component";

@Component({
    selector: 'app-user-account-settings',
    imports: [
        PageTitleComponent,
    ],
    templateUrl: './user-account-settings.component.html',
    styles: ``
})

export class UserAccountSettingsComponent {
    ownUser: ExtendedUser | undefined | null;

    email: string = "";
    emailVerified: boolean = false;

    allowIpAuth: boolean = false;
    allowPsnAuth: boolean = false;
    allowRpcnAuth: boolean = false;

    protected isMobile: boolean = false;

    constructor(private title: TitleService, private client: ClientService, private auth: AuthenticationService, 
                protected layout: LayoutService) 
    {
        this.auth.user.subscribe(user => {
            if (user) {
                this.ownUser = user;
                this.updateInputs(user);
            }
        });

        this.layout.isMobile.subscribe(v => this.isMobile = v);
    }

    updateInputs(user: ExtendedUser) {
        this.email = user.emailAddress ?? "";
        this.emailVerified = user.emailAddressVerified;

        this.allowIpAuth = user.allowIpAuthentication;
        this.allowPsnAuth = user.psnAuthenticationAllowed;
        this.allowRpcnAuth = user.rpcnAuthenticationAllowed;
    }

    uploadChanges() {
        let request: AccountUpdateRequest = {
            emailAddress: this.email,

            allowIpAuthentication: this.allowIpAuth,
            psnAuthenticationAllowed: this.allowPsnAuth,
            rpcnAuthenticationAllowed: this.allowRpcnAuth,
        };

        this.auth.UpdateAccount(request);
    }
}