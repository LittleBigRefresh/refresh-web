import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { environment } from "src/environments/environment";
import { Category } from "./types/category";
import { Level } from "./types/level";

@Injectable({providedIn: 'root'})
export class ApiClient {
    constructor(private httpClient: HttpClient) { }

    public IsSignedIn(): boolean {
        return false;
    }

    public GetLevelCategories(): Observable<Category[]> {
        return this.httpClient.get<Category[]>(environment.apiBaseUrl + "/levels")
    }

    public GetLevelListing(route: string): Observable<Level[]> {
        return this.httpClient.get<Level[]>(environment.apiBaseUrl + "/levels/" + route)
    }
}