import {HttpClient} from "@angular/common/http";
import {EventEmitter, Injectable} from "@angular/core";
import {Router} from "@angular/router";
import {catchError, Observable, of, switchMap} from "rxjs";
import {environment} from "src/environments/environment";
import {BannerService} from "../banners/banner.service";
import {ApiAuthenticationRequest} from "./types/auth/auth-request";
import {ApiAuthenticationResponse} from "./types/auth/auth-response";
import {ApiPasswordResetRequest} from "./types/auth/reset-request";
import {Category} from "./types/category";
import {Level} from "./types/level";
import {User} from "./types/user";
import {Statistics} from "./types/statistics";
import {Room} from "./types/rooms/room";
import {Score} from "./types/score";
import {Photo} from "./types/photo";
import {RefreshNotification} from "./types/refresh-notification";
import {ApiResponse} from "./types/response/api-response";
import {ApiError} from "./types/response/api-error";

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

    if (storedToken) {
      this.GetMyUser(() => {
        // only subscribe after getting user
        this.userWatcher.subscribe((user) => this.onUserUpdate(user));
      });
    } else {
      this.userWatcher.emit(undefined);
      this.userWatcher.subscribe((user) => this.onUserUpdate(user));
    }
  }

  private makeRequest<T>(method: string, endpoint: string, body: any = null, catchErrors: boolean = true): Observable<T> {
    let result: Observable<ApiResponse<T> | (T | undefined)> = this.httpClient.request<ApiResponse<T>>(method, environment.apiBaseUrl + '/' + endpoint, {
      body: body
    });

    // @ts-ignore
    result = result.pipe(switchMap((data: ApiResponse<T>) => {
      if (!data.success) {
        if (catchErrors) {
          this.bannerService.pushError(`API Error: ${data.error?.name} (${data.error?.statusCode})`, data.error?.message ?? "Unknown error")
          return of(undefined);
        }

        const respError: ApiError = data.error!;
        return of(respError);
      }

      const resp: T = data.data!;
      return of(resp);
    }));

    // @ts-ignore
    return result;
  }

  onUserUpdate(user: User | undefined): void {
    console.log("Handling user change: " + user)
    if (user !== undefined) {
      this.bannerService.pushSuccess(`Hi, ${user.username}!`, 'You have been successfully signed in.')
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
    if (this._userId !== undefined) throw Error("Cannot sign in when already signed in as someone."); // should never happen hopefully

    const body: ApiAuthenticationRequest = {
      Username: username,
      PasswordSha512: passwordSha512,
    }

    this.makeRequest<ApiAuthenticationResponse>("POST", "login", body)
      .pipe(catchError((err) => {
        this.bannerService.pushError('Failed to sign in', err.error?.error?.message ?? "No error was provided by the server. Check the console for more details.")
        console.error(err);

        if (err.error?.ResetToken !== undefined) {
          this.resetToken = err.error.ResetToken;
          this.router.navigateByUrl("/forgotPassword?username=" + username)
        }
        return of(undefined);
      }))
      .subscribe((authResponse) => {
        if (authResponse === undefined) return;

        this._userId = authResponse.UserId;
        localStorage.setItem('game_token', authResponse.TokenData);
        this.GetMyUser();
      });

    return true;
  }

  private GetMyUser(callback: Function | null = null) {
    this.makeRequest<User>("GET", "users/me")
      .pipe(catchError((err) => {
        console.error(err);
        return of(undefined);
      }))
      .subscribe((data) => {
        console.log("Got user data");
        this.user = data;
        this.userWatcher.emit(this.user);
        if (callback) callback();
      });
  }

  public GetUserByUsername(username: string): Observable<User> {
    return this.makeRequest<User>("GET", "users/name/" + username)
  }

  public GetUserByUuid(uuid: string): Observable<User> {
    return this.makeRequest<User>("GET", "users/uuid/" + uuid)
  }

  public LogOut() {
    this._userId = undefined;
    this.user = undefined;

    localStorage.removeItem('game_token');

    this.userWatcher.emit(undefined);
    this.makeRequest("POST", "logout", {})
      .subscribe(() => {
      }); // Need to subscribe for request to fire
  }

  public ResetPassword(username: string, passwordSha512: string, signIn: boolean = false): void {
    if (this.resetToken == undefined) {
      this.bannerService.pushError('Could not reset password', 'There was no token to authorize this action.')
      return;
    }

    const body: ApiPasswordResetRequest = {
      PasswordSha512: passwordSha512,
      ResetToken: this.resetToken,
    }

    this.makeRequest("POST", "resetPassword", body)
      .subscribe(() => {
        if (signIn) this.LogIn(username, passwordSha512);
        this.bannerService.push({
          Color: 'success',
          Icon: 'key',
          Title: "Password reset successful",
          Text: "Your account's password has been reset.",
        })
      });
  }

  public GetLevelCategories(): Observable<Category[]> {
    if (this.categories !== undefined) {
      return new Observable<Category[]>(observer => {
        observer.next(this.categories!)
      });
    }

    return this.makeRequest<Category[]>("GET", "levels");
  }

  public GetLevelListing(route: string): Observable<Level[]> {
    return this.makeRequest<Level[]>("GET", "levels/" + route)
  }

  public GetLevelById(id: number): Observable<Level> {
    return this.makeRequest<Level>("GET", "levels/id/" + id)
  }

  public GetServerStatistics(): Observable<Statistics> {
    return this.makeRequest<Statistics>("GET", "statistics")
  }

  public GetUsersRoom(userUuid: string): Observable<Room> {
    return this.makeRequest<Room>("GET", "rooms/uuid/" + userUuid)
  }

  public GetScoresForLevel(levelId: number, scoreType: number, skip: number): Observable<Score[]> {
    return this.makeRequest<Score[]>("GET", "scores/" + levelId + "/" + scoreType + "?showAll=false&count=10&skip=" + skip)
  }

  public GetRecentPhotos(count: number = 20, skip: number = 0) {
    return this.makeRequest<Photo[]>("GET", "photos" + "?count=" + count + "&skip=" + skip);
  }

  public GetPhotoById(id: number) {
    return this.makeRequest<Photo>("GET", "photos/" + id);
  }

  public GetNotifications() {
    return this.makeRequest<RefreshNotification[]>("GET", "notifications")
  }

  public ClearNotification(notificationId: string) {
    return this.makeRequest("DELETE", "notifications/" + notificationId);
  }

  public ClearAllNotifications() {
    return this.makeRequest("DELETE", "notifications");
  }
}

export function GetPhotoLink(photo: Photo, large: boolean = true): string {
  const hash = large ? photo.largeHash : photo.smallHash;
  return environment.apiBaseUrl + "/assets/" + hash + "/image";
}

export function GetAssetImageLink(hash: string | undefined): string {
  if (hash === undefined) return "";
  return environment.apiBaseUrl + "/assets/" + hash + "/image";
}
