import { Component } from "@angular/core";
import { AuthenticationService } from "../../../api/authentication.service";
import { PageTitleComponent } from "../../../components/ui/text/page-title.component";
import { ButtonComponent } from "../../../components/ui/form/button.component";
import { ButtonGroupComponent } from "../../../components/ui/form/button-group.component";
import { DividerComponent } from "../../../components/ui/divider.component";

@Component({
    selector: 'app-logout',
    standalone: true,
    imports: [
    PageTitleComponent,
    ButtonComponent,
    DividerComponent,
    ButtonGroupComponent,
    DividerComponent
],
    templateUrl: './logout.component.html'
})

export class LogoutComponent {
    constructor(protected auth: AuthenticationService) {
        
    }
}