export interface RefreshApiError {
    name: string;
    message: string;
    statusCode: number;
    warning: boolean | undefined;
}
