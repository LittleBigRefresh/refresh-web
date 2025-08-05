export interface ProfileUpdateRequest {
    description: string | undefined;

    unescapeXmlSequences: boolean | undefined;
    showModdedContent: boolean | undefined;
    showReuploadedContent: boolean | undefined;
}