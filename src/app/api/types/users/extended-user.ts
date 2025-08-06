import { ContentVisibility } from "../content-visibility";
import {User} from "./user";

export interface ExtendedUser extends User {
    banReason: string | null;
    banExpiryDate: Date | null;

    allowIpAuthentication: boolean;
    rpcnAuthenticationAllowed: boolean;
    psnAuthenticationAllowed: boolean;

    unescapeXmlSequences: boolean;
    showModdedContent: boolean;
    showReuploadedContent: boolean;
    redirectGriefReportsToPhotos: boolean;

    emailAddress: string | undefined;
    emailAddressVerified: boolean;

    levelVisibility: ContentVisibility;
    profileVisibility: ContentVisibility;
}