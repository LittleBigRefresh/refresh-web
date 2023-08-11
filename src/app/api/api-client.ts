import {HttpClient} from "@angular/common/http";
import {EventEmitter, Injectable} from "@angular/core";
import {catchError, Observable, of, switchMap, tap} from "rxjs";
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
import {Route} from "./types/documentation/route";
import {Router} from "@angular/router";
import {UserUpdateRequest} from "./types/user-update-request";
import {ActivityPage} from "./types/activity/activity-page";
import {ApiListResponse} from "./types/response/api-list-response";
import {IpVerificationRequest} from "./types/auth/ip-verification-request";
import {ExtendedUser} from "./types/extended-user";
import {Instance} from "./types/instance";
import {Announcement} from "./types/announcement";
import {AdminPunishUserRequest} from "./types/admin/admin-punish-user-request";

@Injectable({providedIn: 'root'})
export class ApiClient {
  private _userId: string | undefined = undefined;
  user: ExtendedUser | undefined = undefined;

  resetToken: string | undefined = undefined;

  private categories: Category[] | undefined;

  userWatcher: EventEmitter<ExtendedUser | undefined>

  private statistics: Statistics | undefined;
  private instance: Instance | undefined;

  constructor(private httpClient: HttpClient, private bannerService: BannerService, private router: Router) {
    this.userWatcher = new EventEmitter<ExtendedUser | undefined>();

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

  private handleRequestError<T>(data: ApiResponse<T>, catchErrors: boolean) {
    if (catchErrors) {
      this.bannerService.pushError(`API Error: ${data.error?.name} (${data.error?.statusCode})`, data.error?.message ?? "Unknown error")
      return of(undefined);
    }

    const respError: ApiError = data.error!;
    return of(respError);
  }

  private makeRequest<T>(method: string, endpoint: string, body: any = null, catchErrors: boolean = true): Observable<T> {
    let result: Observable<ApiResponse<T> | (T | undefined)> = this.httpClient.request<ApiResponse<T>>(method, environment.apiBaseUrl + '/' + endpoint, {
      body: body
    });

    // @ts-ignore
    result = result.pipe(switchMap((data: ApiResponse<T>) => {
      if (!data.success) {
        return this.handleRequestError(data, catchErrors);
      }

      return of(data.data!);
    }));

    // @ts-ignore
    return result;
  }

  private makeListRequest<T>(method: string, endpoint: string, catchErrors: boolean = true): Observable<ApiListResponse<T>> {
    let result: Observable<ApiResponse<T[]> | (T[] | undefined)> = this.httpClient.request<ApiResponse<T[]>>(method, environment.apiBaseUrl + '/' + endpoint);

    // @ts-ignore
    result = result.pipe(switchMap((data: ApiResponse<T[]>) => {
      if (!data.success) {
        return this.handleRequestError(data, catchErrors);
      }

      const resp: ApiListResponse<T> = {
        items: data.data!,
        listInfo: data.listInfo!,
      };

      return of(resp);
    }));

    // @ts-ignore
    return result;
  }

  onUserUpdate(user: ExtendedUser | undefined): void {
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

  public GetServerStatistics(): Observable<Statistics> {
    if(this.statistics !== undefined) {
      return new Observable<Statistics>(observer => {
        observer.next(this.statistics!)
      });
    }

    return this.makeRequest<Statistics>("GET", "statistics")
      .pipe(tap(data => {
        this.statistics = data;
      }))
  }

  public GetInstanceInformation(): Observable<Instance> {
    if(this.instance !== undefined) {
      return new Observable<Instance>(observer => {
        observer.next(this.instance!)
      });
    }

    return this.makeRequest<Instance>("GET", "instance")
      .pipe(tap(data => {
        this.instance = data;
      }))
  }

  public LogIn(emailAddress: string, passwordSha512: string): boolean {
    if (this._userId !== undefined) throw Error("Cannot sign in when already signed in as someone."); // should never happen hopefully

    const body: ApiAuthenticationRequest = {
      username: undefined,
      emailAddress,
      passwordSha512: passwordSha512,
    }

    this.makeRequest<ApiAuthenticationResponse>("POST", "login", body, false)
      .pipe(catchError((err) => {
        this.bannerService.pushError('Failed to sign in', err.error?.error?.message ?? "No error was provided by the server. Check the console for more details.")
        console.error(err);

        if (err.error?.ResetToken !== undefined) {
          this.resetToken = err.error.ResetToken;
          this.router.navigateByUrl("/forgotPassword?email=" + emailAddress)
        }
        return of(undefined);
      }))
      .subscribe((authResponse) => {
        if (authResponse === undefined) return;

        this._userId = authResponse.userId;
        localStorage.setItem('game_token', authResponse.tokenData);
        this.GetMyUser();
      });

    return true;
  }

  public Register(username: string, emailAddress: string, passwordSha512: string): boolean {
    if (this._userId !== undefined) throw Error("Cannot register when already signed in as someone."); // should never happen hopefully

    const body: ApiAuthenticationRequest = {
      username,
      emailAddress,
      passwordSha512,
    }

    this.makeRequest<ApiAuthenticationResponse>("POST", "register", body, false)
      .pipe(catchError((err) => {
        this.bannerService.pushError('Failed to register', err.error?.error?.message ?? "No error was provided by the server. Check the console for more details.")
        console.error(err);
        return of(undefined);
      }))
      .subscribe((authResponse) => {
        if (authResponse === undefined) return;

        this._userId = authResponse.userId;
        localStorage.setItem('game_token', authResponse.tokenData);
        this.GetMyUser();
      });

    return true;
  }

  private GetMyUser(callback: Function | null = null) {
    this.makeRequest<ExtendedUser>("GET", "users/me")
      .pipe(catchError((err) => {
        console.error(err);
        return of(undefined);
      }))
      .subscribe((data) => {
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

  public GetExtendedUserByUuid(uuid: string): Observable<ExtendedUser> {
    return this.makeRequest<ExtendedUser>("GET", "admin/users/uuid/" + uuid)
  }

  public LogOut() {
    this._userId = undefined;
    this.user = undefined;

    this.userWatcher.emit(undefined);
    this.makeRequest("PUT", "logout", {}).subscribe();

    localStorage.removeItem('game_token');
  }

  public ResetPassword(emailAddress: string, passwordSha512: string, signIn: boolean = false): void {
    if (this.resetToken == undefined) {
      this.bannerService.pushError('Could not reset password', 'There was no token to authorize this action.')
      return;
    }

    const body: ApiPasswordResetRequest = {
      passwordSha512: passwordSha512,
      resetToken: this.resetToken,
    }

    this.makeRequest("PUT", "resetPassword", body)
      .subscribe(() => {
        if (signIn) this.LogIn(emailAddress, passwordSha512);
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

    return this.makeRequest<Category[]>("GET", "levels?includePreviews=true");
  }

  public GetLevelListing(route: string, count: number = 20, skip: number = 0): Observable<ApiListResponse<Level>> {
    return this.makeListRequest<Level>("GET", `levels/${route}?count=${count}&skip=${skip}`);
  }

  public GetLevelById(id: number): Observable<Level> {
    return this.makeRequest<Level>("GET", "levels/id/" + id)
  }

  public GetUsersRoom(userUuid: string): Observable<Room> {
    return this.makeRequest<Room>("GET", "rooms/uuid/" + userUuid)
  }

  public GetScoresForLevel(levelId: number, scoreType: number, skip: number): Observable<ApiListResponse<Score>> {
    return this.makeListRequest<Score>("GET", "scores/" + levelId + "/" + scoreType + "?showAll=false&count=10&skip=" + skip)
  }

  public GetRecentPhotos(count: number = 20, skip: number = 0) {
    return this.makeListRequest<Photo>("GET", "photos" + "?count=" + count + "&skip=" + skip);
  }

  public GetPhotoById(id: number) {
    return this.makeRequest<Photo>("GET", "photos/" + id);
  }

  public GetNotifications(): Observable<ApiListResponse<RefreshNotification>> {
    return this.makeListRequest<RefreshNotification>("GET", "notifications")
  }

  public ClearNotification(notificationId: string) {
    return this.makeRequest("DELETE", "notifications/" + notificationId);
  }

  public ClearAllNotifications() {
    return this.makeRequest("DELETE", "notifications");
  }

  public GetDocumentation() {
    return this.makeListRequest<Route>("GET", "documentation");
  }

  public UpdateUser(data: UserUpdateRequest): void {
    this.makeRequest<ExtendedUser>("PATCH", "users/me", data)
      .subscribe(data => {
        this.bannerService.pushSuccess("User updated", "Your profile was successfully updated.");
        this.user = data;
        // this.userWatcher.emit(data); // TODO: don't trigger login detection
      });
  }

  public GetActivity(count: number, skip: number): Observable<ActivityPage> {
    return this.makeRequest<ActivityPage>("GET", `activity?skip=${skip}&count=${count}`);
  }

  public GetActivityForLevel(levelId: number, count: number, skip: number): Observable<ActivityPage> {
    return this.makeRequest<ActivityPage>("GET", "levels/id/" + levelId + "/activity?skip=" + skip + "&count=" + count);
  }

  public GetIpVerificationRequests(): Observable<ApiListResponse<IpVerificationRequest>> {
    return this.makeListRequest<IpVerificationRequest>("GET", "verificationRequests?skip=0&count=100");
  }

  public ApproveIpVerificationRequests(ipAddress: string): Observable<IpVerificationRequest> {
    return this.makeRequest<IpVerificationRequest>("PUT", "verificationRequests/approve", ipAddress);
  }

  public DenyIpVerificationRequests(ipAddress: string): Observable<IpVerificationRequest> {
    return this.makeRequest<IpVerificationRequest>("PUT", "verificationRequests/deny", ipAddress);
  }

  public AdminAddAnnouncement(title: string, body: string) {
    this.makeRequest<Announcement>("POST", "admin/announcements", {title, text: body})
      .subscribe(data => {
        this.instance?.announcements.push({title, text: body, announcementId: data.announcementId})
      });
  }

  public AdminRemoveAnnouncement(id: string) {
    this.makeRequest("DELETE", "admin/announcements/" + id).subscribe();

    // TODO: do this client-side instead of refreshing from server
    this.instance = undefined;
    this.GetInstanceInformation().subscribe();
  }

  public AdminPunishUser(user: User, punishmentType: 'restrict' | 'ban', expiryDate: Date, reason: string) {
    const body: AdminPunishUserRequest = {
      expiryDate,
      reason
    };

    this.makeRequest("POST", `admin/users/uuid/${user.userId}/${punishmentType}`, body).subscribe();
  }

  public AdminPardonUser(user: User) {
    this.makeRequest("POST", `admin/users/uuid/${user.userId}/pardon`).subscribe();
  }

  public AdminAddTeamPick(level: Level) {
    this.makeRequest("POST", `admin/levels/id/${level.levelId}/teamPick`).subscribe();
    level.teamPicked = true;
  }

  public AdminRemoveTeamPick(level: Level) {
    this.makeRequest("POST", `admin/levels/id/${level.levelId}/removeTeamPick`).subscribe();
    level.teamPicked = false;
  }
}

export function GetPhotoLink(photo: Photo, large: boolean = true): string {
  return GetAssetImageLink(large ? photo.largeHash : photo.smallHash);
}

export function GetAssetImageLink(hash: string | undefined): string {
  if (hash === undefined || hash === null || hash === "0" || hash.startsWith('g')) return "";
  return environment.apiBaseUrl + "/assets/" + hash + "/image";
}
