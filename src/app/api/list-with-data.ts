import {RefreshApiListInfo} from "./refresh-api-list-info";

export interface ListWithData<TData> {
    data: TData[];
    listInfo: RefreshApiListInfo;
}
