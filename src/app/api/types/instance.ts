import {Announcement} from "./announcement";

export interface Instance {
    instanceName: string;
    instanceDescription: string;

    softwareName: string;
    softwareVersion: string;
    softwareType: string;

    registrationEnabled: boolean;
    maximumAssetSafetyLevel: number;

    announcements: Announcement[];
    maintenanceModeEnabled: boolean;
    grafanaDashboardUrl: string | null;
}
