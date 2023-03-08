import { HttpClient } from "@angular/common/http";
import { EventEmitter, Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { environment } from "src/environments/environment";
import { Category } from "./types/category";
import { Level } from "./types/level";
import { User } from "./types/user";

@Injectable({providedIn: 'root'})
export class ApiClient {
    private _userId: string | undefined = undefined;
    user: User | undefined = undefined;

    userWatcher = new EventEmitter<User | undefined>();

    constructor(private httpClient: HttpClient) {}

    ngOnInit(): void {
        this.userWatcher.emit(undefined);
    }

    public LogIn(username: string, passwordSha512: string): boolean {
        if(this._userId !== undefined) throw Error("Cannot sign in when already signed in as someone."); // should never happen hopefully

        this._userId = "63fd445af87e18deaba9c5d9"

        this.httpClient.get<User>(environment.apiBaseUrl + "/user/uuid/" + this._userId)
            .subscribe((data) => {
                this.user = data;
                this.userWatcher.emit(this.user);
            })

        return true;
        // this.httpClient.post(environment.apiBaseUrl + "/auth");
    }

    public LogOut() {
        this._userId = undefined;
        this.user = undefined;

        this.userWatcher.emit(undefined);
        // this.httpClient.post(environment.apiBaseUrl + "/goodbye");
    }

    public GetLevelCategories(): Observable<Category[]> {
        return this.httpClient.get<Category[]>(environment.apiBaseUrl + "/levels")
    }

    public GetLevelListing(route: string): Observable<Level[]> {
        return this.httpClient.get<Level[]>(environment.apiBaseUrl + "/levels/" + route)
    }

    public GetLevelById(id: number): Observable<Level> {
        return this.httpClient.get<Level>(environment.apiBaseUrl + "/level/id/" + id)
    }
}