import {Announcement} from "./announcement";
import { ContactInfo } from "./contact-info";
import {Contest} from "./contests/contest";

export interface Instance {
    instanceName: string;
    instanceDescription: string;
    websiteLogoUrl: string;

    softwareName: string;
    softwareVersion: string;
    softwareType: string;
    softwareSourceUrl: string;
    softwareLicenseName: string;
    softwareLicenseUrl: string;

    registrationEnabled: boolean;
    maximumAssetSafetyLevel: number;

    announcements: Announcement[];
    maintenanceModeEnabled: boolean;
    grafanaDashboardUrl: string | null;
    
    activeContest: Contest | null;
    contactInfo: ContactInfo;
}
