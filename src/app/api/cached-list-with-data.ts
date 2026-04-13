import { ListWithData } from "./list-with-data";

export interface CachedListWithData<TData> extends ListWithData<TData> {
    totalLoads: number;
}