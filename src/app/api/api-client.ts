import { HttpClient } from "@angular/common/http";
import { EventEmitter, Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { catchError, Observable, of } from "rxjs";
import { environment } from "src/environments/environment";
import { NotificationService } from "../notifications/notification-service";
import { ApiAuthenticationRequest } from "./types/auth/auth-request";
import { ApiAuthenticationResponse } from "./types/auth/auth-response";
import { Category } from "./types/category";
import { Level } from "./types/level";
import { User } from "./types/user";

@Injectable({providedIn: 'root'})
export class ApiClient {
    private _userId: string | undefined = undefined;
    user: User | undefined = undefined;

    resetToken: string | undefined = undefined;

    userWatcher = new EventEmitter<User | undefined>();

    constructor(private httpClient: HttpClient, private notificationService: NotificationService, private router: Router) {}

    userNotification(user: User | undefined): void {
        if(user !== undefined) {
            this.notificationService.notifications.push({
                Title: `Hi, ${user.Username}!`,
                Icon: 'check-circle',
                Color: 'green',
                Text: 'You have been successfully signed in.'
            })

            this.router.navigate(['/'])
        } else {
            this.notificationService.notifications.push({
                Title: `Signed out`,
                Icon: 'right-from-bracket',
                Color: 'orange',
                Text: 'You have been logged out.'
            })

            this.router.navigate(['/login'])
        }
    }

    ngOnInit(): void {
        this.userWatcher.subscribe((user) => this.userNotification(user))
        this.userWatcher.emit(undefined);
    }

    public LogIn(username: string, passwordBcrypt: string): boolean {
        if(this._userId !== undefined) throw Error("Cannot sign in when already signed in as someone."); // should never happen hopefully

        const body: ApiAuthenticationRequest = {
            Username: username,
            PasswordBcrypt: passwordBcrypt,
        }

        this.httpClient.post<ApiAuthenticationResponse>(environment.apiBaseUrl + "/auth", body)
            .pipe(catchError((err, caught) => {
                this.notificationService.notifications.push({
                    Color: 'red',
                    Icon: 'exclamation-circle',
                    Title: 'Failed to sign in',
                    Text: err.error?.Reason,
                })
                console.error(err);

                if(err.error?.ResetToken !== undefined) {
                    this.resetToken = err.error.ResetToken;
                    this.router.navigateByUrl("/forgotPassword?username=" + username)
                }
                return of(undefined);
            }))
            .subscribe((authResponse) => {
                if(authResponse === undefined) return;

                this._userId = authResponse.UserId;

                this.httpClient.get<User>(environment.apiBaseUrl + "/user/uuid/" + this._userId)
                .subscribe((data) => {
                    this.user = data;
                    this.userWatcher.emit(this.user);
                })
            });
            
        return true;
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