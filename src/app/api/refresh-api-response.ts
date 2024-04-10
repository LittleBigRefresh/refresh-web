import {RefreshApiError} from "./refresh-api-error";
import {RefreshApiListInfo} from "./refresh-api-list-info";

export interface RefreshApiResponse<TData> {
    data: TData | undefined;
    listInfo: RefreshApiListInfo | undefined;

    success: boolean;
    error: RefreshApiError | undefined;
}
