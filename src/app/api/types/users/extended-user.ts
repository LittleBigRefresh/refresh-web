import {User} from "./user";

export interface ExtendedUser extends User {
    allowIpAuthentication: boolean;
    banReason: string | null;
    banExpiryDate: Date | null;

    rpcnAuthenticationAllowed: boolean;
    psnAuthenticationAllowed: boolean;

    redirectGriefReportsToPhotos: boolean;

    emailAddress: string | undefined;
    emailAddressVerified: boolean;
}