import { HttpClient } from "@angular/common/http";
import { EventEmitter, Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { catchError, Observable, of } from "rxjs";
import { environment } from "src/environments/environment";
import { BannerService } from "../banners/banner.service";
import { ApiAuthenticationRequest } from "./types/auth/auth-request";
import { ApiAuthenticationResponse } from "./types/auth/auth-response";
import { ApiPasswordResetRequest } from "./types/auth/reset-request";
import { Category } from "./types/category";
import { Level } from "./types/level";
import { User } from "./types/user";
import { Statistics } from "./types/statistics";
import { Room } from "./types/rooms/room";
import { Score } from "./types/score";
import { Photo } from "./types/photo";
import { RefreshNotification } from "./types/refresh-notification";

@Injectable({providedIn: 'root'})
export class ApiClient {
    private _userId: string | undefined = undefined;
    user: User | undefined = undefined;

    resetToken: string | undefined = undefined;

    private categories: Category[] | undefined;

    userWatcher: EventEmitter<User | undefined>

    constructor(private httpClient: HttpClient, private bannerService: BannerService, private router: Router) {
        this.userWatcher = new EventEmitter<User | undefined>();

        const storedToken: string | null = localStorage.getItem('game_token');

        if(storedToken) {
            this.GetMyUser(() => {
                // only subscribe after getting user
                this.userWatcher.subscribe((user) => this.userUpdateBanner(user));
            });
        } else {
            this.userWatcher.emit(undefined);
            this.userWatcher.subscribe((user) => this.userUpdateBanner(user));
        }
    }

    userUpdateBanner(user: User | undefined): void {
        console.log("Handling user change: " + user)
        if(user !== undefined) {
            this.bannerService.pushSuccess(`Hi, ${user.Username}!`, 'You have been successfully signed in.')
            this.router.navigate(['/'])
        } else {
            this.bannerService.push({
                Title: `Signed out`,
                Icon: 'right-from-bracket',
                Color: 'warning',
                Text: 'You have been logged out.'
            })

            this.router.navigate(['/login'])
        }
    }

    public LogIn(username: string, passwordSha512: string): boolean {
        if(this._userId !== undefined) throw Error("Cannot sign in when already signed in as someone."); // should never happen hopefully

        const body: ApiAuthenticationRequest = {
            Username: username,
            PasswordSha512: passwordSha512,
        }

        this.httpClient.post<ApiAuthenticationResponse>(environment.apiBaseUrl + "/auth", body)
            .pipe(catchError((err) => {
                this.bannerService.pushError('Failed to sign in', err.error?.Reason ?? "No error was provided by the server. Check the console for more details.")
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
                localStorage.setItem('game_token', authResponse.TokenData);
                this.GetMyUser();
            });

        return true;
    }

    private GetMyUser(callback: Function | null = null) {
        this.httpClient.get<User>(environment.apiBaseUrl + "/user/me")
            .pipe(catchError((err) => {
                console.error(err);
                return of(undefined);
            }))
            .subscribe((data) => {
                console.log("Got user data");
                this.user = data;
                this.userWatcher.emit(this.user);
                if(callback) callback();
            });
    }

    public GetUserByUsername(username: string): Observable<User> {
        return this.httpClient.get<User>(environment.apiBaseUrl + "/user/name/" + username)
    }

    public GetUserByUuid(uuid: string): Observable<User> {
        return this.httpClient.get<User>(environment.apiBaseUrl + "/user/uuid/" + uuid)
    }

    public LogOut() {
        this._userId = undefined;
        this.user = undefined;

        localStorage.removeItem('game_token');

        this.userWatcher.emit(undefined);
        this.httpClient.post(environment.apiBaseUrl + "/goodbye", {})
            .subscribe(() => {}); // Need to subscribe for request to fire
    }

    public ResetPassword(username: string, passwordSha512: string, signIn: boolean = false): void {
        if(this.resetToken == undefined) {
            this.bannerService.pushError('Could not reset password', 'There was no token to authorize this action.')
            return;
        }

        const body: ApiPasswordResetRequest = {
            PasswordSha512: passwordSha512,
            ResetToken: this.resetToken,
        }

        this.httpClient.post(environment.apiBaseUrl + "/resetPassword", body)
            .subscribe(() => {
                if(signIn) this.LogIn(username, passwordSha512);
                this.bannerService.push({
                    Color: 'success',
                    Icon: 'key',
                    Title: "Password reset successful",
                    Text: "Your account's password has been reset.",
                })
            });
    }

    public GetLevelCategories(): Observable<Category[]> {
        if(this.categories !== undefined) {
            return new Observable<Category[]>(observer => { observer.next(this.categories!) });
        }

        return this.httpClient.get<Category[]>(environment.apiBaseUrl + "/levels")
            .pipe(observer => {
                observer.subscribe(data => {
                    this.categories = data;
                });

                return observer;
            })
    }

    public GetLevelListing(route: string): Observable<Level[]> {
        return this.httpClient.get<Level[]>(environment.apiBaseUrl + "/levels/" + route)
    }

    public GetLevelById(id: number): Observable<Level> {
        return this.httpClient.get<Level>(environment.apiBaseUrl + "/level/id/" + id)
    }

    public GetServerStatistics(): Observable<Statistics> {
        return this.httpClient.get<Statistics>(environment.apiBaseUrl + "/statistics")
    }

    public GetUsersRoom(userUuid: string): Observable<Room> {
        return this.httpClient.get<Room>(environment.apiBaseUrl + "/room/uuid/" + userUuid)
    }

    public GetScoresForLevel(levelId: number, scoreType: number, skip: number): Observable<Score[]> {
        return this.httpClient.get<Score[]>(environment.apiBaseUrl + "/scores/" + levelId + "/" + scoreType + "?showAll=false&count=10&skip=" + skip)
    }

    public GetRecentPhotos(count: number = 20, skip: number = 0) {
        return this.httpClient.get<Photo[]>(environment.apiBaseUrl + "/photos" + "?count=" + count + "&skip=" + skip);
    }

    public GetPhotoById(id: number) {
        return this.httpClient.get<Photo>(environment.apiBaseUrl + "/photo/" + id);
    }

    public GetNotifications() {
      return this.httpClient.get<RefreshNotification[]>(environment.apiBaseUrl + "/notifications")
    }

    public ClearNotification(notificationId: string) {
      return this.httpClient.delete(environment.apiBaseUrl + "/notification/" + notificationId);
    }

    public ClearAllNotifications() {
      return this.httpClient.delete(environment.apiBaseUrl + "/notifications");
    }
}

export function GetPhotoLink(photo: Photo, large: boolean = true): string {
  const hash = large ? photo.LargeHash : photo.SmallHash;
  return environment.apiBaseUrl + "/asset/" + hash + "/image";
}

export function GetAssetImageLink(hash: string | undefined): string {
  if(hash === undefined) return "";
  return environment.apiBaseUrl + "/asset/" + hash + "/image";
}
