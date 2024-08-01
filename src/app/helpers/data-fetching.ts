import {ImageLoaderConfig} from "@angular/common";

export function getApiBaseUrl(): string {
    return "https://lbp.littlebigrefresh.com/api/v3";
}

export function getImageLink(hash: string): string {
    return `${getApiBaseUrl()}/assets/${hash}/image`;
}

export function loadImage(config: ImageLoaderConfig) {
    if(config.src.startsWith("/")) return config.src;
    if(config.src.startsWith("http")) return config.src;

    // Only consider SHA1 asset hashes
    // Naturally filters out GUIDs, and blank hashes.
    if(config.src.length != 40) return "/assets/missingLevel.svg";

    return getImageLink(config.src);
}
