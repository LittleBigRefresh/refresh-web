export interface RefreshApiListInfo {
    nextPageIndex: number;
    totalItems: number;
}

export const defaultListInfo: RefreshApiListInfo = {
    nextPageIndex: 0,
    totalItems: -1,
}
