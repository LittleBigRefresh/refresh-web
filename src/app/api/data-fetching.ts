export function getApiBaseUrl(): string {
    return "https://lbp.littlebigrefresh.com/api/v3";
}

export function getImageLink(hash: string): string {
    return `${getApiBaseUrl()}/assets/${hash}/image`;
}
