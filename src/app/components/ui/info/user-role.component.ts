import {Component, Input} from '@angular/core';
import { UserRoles } from '../../../api/types/users/user-roles';
import { RolePipe } from '../../../pipes/role.pipe';
import { FaIconComponent } from "@fortawesome/angular-fontawesome";
import { IconProp } from '@fortawesome/fontawesome-svg-core';
import { faUser, faUserAltSlash, faUserAstronaut, faUserCheck, faUserGear, faUserLock, faUserPen, faUserShield } from '@fortawesome/free-solid-svg-icons';
import { TooltipComponent } from "../text/tooltip.component";

@Component({
    selector: 'app-user-role',
    imports: [
    RolePipe,
    FaIconComponent,
    TooltipComponent
],
    providers: [
        RolePipe
    ],
    template: `
        <!-- for some reason Angular doesn't escape the ' if it's prefixed by only one backslash here specifically-->
        <app-tooltip [text]="'This user\\\'s role is ' + (role | role)" >
            <span  class="pl-1 text-gentle text-md">
                @if (roleIcon) {
                    <fa-icon class="text-sm" [icon]="roleIcon"></fa-icon>
                }
                @if (!short) {
                    <span class="pl-1">{{ role | role }}</span>
                }
            </span>
        </app-tooltip>
        
    `
})
export class UserRoleComponent {
    @Input({required: true}) role: UserRoles = UserRoles.User;
    @Input() short: boolean = false;
    roleIcon: IconProp | undefined;
    f: string = ""

    ngOnInit() {
        switch (this.role) {
            case UserRoles.Admin:
                this.roleIcon = this.faUserGear;
                break;
            case UserRoles.Moderator:
                this.roleIcon = this.faUserShield;
                break;
            case UserRoles.Curator:
                this.roleIcon = this.faUserPen;
                break;
            case UserRoles.Trusted:
                this.roleIcon = this.faUserCheck;
                break;
            case UserRoles.User:
                this.roleIcon = this.faUser;
                break;
            case UserRoles.Restricted:
                this.roleIcon = this.faUserLock;
                break;
            case UserRoles.Banned:
                this.roleIcon = this.faUserAltSlash;
                break;
            default:
                this.roleIcon = this.faUserAstronaut;
                break;
        }
    }

    protected readonly faUserGear = faUserGear;
    protected readonly faUserShield = faUserShield;
    protected readonly faUserPen = faUserPen;
    protected readonly faUserCheck = faUserCheck;
    protected readonly faUser = faUser;
    protected readonly faUserAltSlash = faUserAltSlash;
    protected readonly faUserLock = faUserLock;
    protected readonly faUserAstronaut = faUserAstronaut;
}
