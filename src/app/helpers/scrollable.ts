import {RefreshApiListInfo} from "../api/refresh-api-list-info";

export interface Scrollable {
    isLoading: boolean;
    listInfo: RefreshApiListInfo;
    loadData(): void;
}
