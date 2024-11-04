import {HttpClient, HttpParams} from "@angular/common/http";
import {Params} from "@angular/router";

export class ApiImplementation {
    constructor(protected http: HttpClient) {
        
    }

    protected createPageQuery(skip: number, count: number, username?: string) {
        return this.setPageQuery(null, skip, count, username);
    }

    protected convertParamsToHttpParams(params: Params | null): HttpParams | null {
        if(params == null) return null;

        let httpParams = new HttpParams();

        for (let key of Object.keys(params)) {
            httpParams = httpParams.set(key, params[key]);
        }

        return httpParams;
    }

    protected setPageQuery(params: Params | null, skip: number, count: number, username?: string) {
        let httpParams = (this.convertParamsToHttpParams(params) ?? new HttpParams())
            .set('skip', skip)
            .set('count', count);
        if(username) httpParams = httpParams.append('username', username);
        return httpParams;
    }
}