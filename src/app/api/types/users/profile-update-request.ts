import { ContentVisibility } from "../content-visibility";

export interface ProfileUpdateRequest {
    description: string | undefined;

    unescapeXmlSequences: boolean | undefined;
    showModdedContent: boolean | undefined;
    showReuploadedContent: boolean | undefined;
    redirectGriefReportsToPhotos: boolean | undefined;

    levelVisibility: ContentVisibility | undefined;
    profileVisibility: ContentVisibility | undefined;
}