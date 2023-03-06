import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { Category } from "./category";
import { environment } from "src/environments/environment";

@Injectable({providedIn: 'root'})
export class ApiClient {
    constructor(private httpClient: HttpClient) { }

    public GetLevelCategories(): Observable<Category[]> {
        return this.httpClient.get<Category[]>(environment.apiBaseUrl + "/levels")
    }
}