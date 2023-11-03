import {Injectable} from "@angular/core";
import {Observable, tap} from "rxjs";
import {environment} from "src/environments/environment";
import {BannerService} from "../banners/banner.service";
import {Category} from "./types/category";
import {Level} from "./types/level";
import {User} from "./types/user";
import {Statistics} from "./types/statistics";
import {Room} from "./types/rooms/room";
import {Score} from "./types/score";
import {Photo} from "./types/photo";
import {RefreshNotification} from "./types/refresh-notification";
import {ApiError} from "./types/response/api-error";
import {Route} from "./types/documentation/route";
import {ActivityPage} from "./types/activity/activity-page";
import {ApiListResponse} from "./types/response/api-list-response";
import {IpVerificationRequest} from "./types/auth/ip-verification-request";
import {ExtendedUser} from "./types/extended-user";
import {Instance} from "./types/instance";
import {Announcement} from "./types/announcement";
import {AdminPunishUserRequest} from "./types/admin/admin-punish-user-request";
import {AdminQueuedRegistration} from "./types/admin/admin-queued-registration";
import {ApiRequestCreator} from "./api-request.creator";
import {LevelEditRequest} from "./types/level-edit-request";

@Injectable({providedIn: 'root'})
export class ApiClient {
  private categories: Category[] | undefined;

  private statistics: Statistics | undefined;
  private instance: Instance | undefined;

  constructor(private apiRequestCreator: ApiRequestCreator, private bannerService: BannerService) {}

  private makeRequest<T>(method: string, endpoint: string, body: any = null, errorHandler: ((error: ApiError) => void) | undefined = undefined): Observable<T> {
    return this.apiRequestCreator.makeRequest<T>(method, endpoint, body, errorHandler);
  }

  private makeListRequest<T>(method: string, endpoint: string, catchErrors: boolean = true): Observable<ApiListResponse<T>> {
    return this.apiRequestCreator.makeListRequest<T>(method, endpoint, catchErrors);
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

  public GetUserByUsername(username: string): Observable<User> {
    return this.makeRequest<User>("GET", "users/name/" + username)
  }

  public GetUserByUuid(uuid: string): Observable<User> {
    return this.makeRequest<User>("GET", "users/uuid/" + uuid)
  }

  public GetExtendedUserByUuid(uuid: string): Observable<ExtendedUser> {
    return this.makeRequest<ExtendedUser>("GET", "admin/users/uuid/" + uuid)
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
    return this.makeRequest<Room>("GET", "rooms/uuid/" + userUuid, null, (_: ApiError) => {})
  }

  public GetScoresForLevel(levelId: number, scoreType: number, skip: number): Observable<ApiListResponse<Score>> {
    return this.makeListRequest<Score>("GET", "scores/" + levelId + "/" + scoreType + "?showAll=false&count=10&skip=" + skip)
  }

  public GetRecentPhotos(count: number = 20, skip: number = 0) {
    return this.makeListRequest<Photo>("GET", "photos" + "?count=" + count + "&skip=" + skip);
  }

  public GetPhotoById(id: number) {
    return this.makeRequest<Photo>("GET", "photos/id/" + id);
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

  public EditLevel(level: LevelEditRequest, id: number): void {
    this.apiRequestCreator.makeRequest("PATCH", "levels/id/" + id, level)
      .subscribe(_ => {
        this.bannerService.pushSuccess("Level Updated", `${level.title} was successfully updated.`);
      });
  }

  public DeleteLevel(level: Level): void {
    this.apiRequestCreator.makeRequest("DELETE", "levels/id/" + level.levelId)
      .subscribe(_ => {
        this.bannerService.pushWarning("Level Deleted", `${level.title} was successfully removed.`);
      });
  }

  public SetLevelAsOverride(level: Level): void {
    this.apiRequestCreator.makeRequest("POST", `levels/id/${level.levelId}/setAsOverride`)
      .subscribe(_ => {
        this.bannerService.pushSuccess("Check your game!", `In LBP, head to 'Lucky Dip' (or any category) and '${level.title}' will show up!`);
      });
  }

  public AdminAddAnnouncement(title: string, body: string) {
    this.makeRequest<Announcement>("POST", "admin/announcements", {title, text: body})
      .subscribe(data => {
        this.instance?.announcements.push({title, text: body, announcementId: data.announcementId})
        this.bannerService.pushSuccess("Posted announcement", "The announcement was successfully posted.");
      });
  }

  public AdminRemoveAnnouncement(id: string) {
    this.makeRequest("DELETE", "admin/announcements/" + id).subscribe(() => {
      this.bannerService.pushWarning("Removed announcement", "The announcement was successfully removed.");
    });

    if(!this.instance) return;
    let index = this.instance.announcements.
      findIndex(announcement => announcement.announcementId === id);

    if (index >= 0) {
      this.instance.announcements.splice(index, 1);
    }
  }

  public AdminPunishUser(user: User, punishmentType: 'restrict' | 'ban', expiryDate: Date, reason: string) {
    const body: AdminPunishUserRequest = {
      expiryDate,
      reason
    };

    this.makeRequest("POST", `admin/users/uuid/${user.userId}/${punishmentType}`, body).subscribe(() => {
      this.bannerService.pushSuccess(user.username + " is punished", "The punishment was successfully applied.");
    });
  }

  public AdminPardonUser(user: User) {
    this.makeRequest("POST", `admin/users/uuid/${user.userId}/pardon`).subscribe(() => {
      this.bannerService.pushSuccess(user.username + " is forgiven", "The punishment was successfully removed.");
    });
  }

  public AdminAddTeamPick(level: Level) {
    this.makeRequest("POST", `admin/levels/id/${level.levelId}/teamPick`).subscribe(() => {
      this.bannerService.pushSuccess("Team Picked", "The level was successfully team picked.");
    });

    level.teamPicked = true;
  }

  public AdminRemoveTeamPick(level: Level) {
    this.makeRequest("POST", `admin/levels/id/${level.levelId}/removeTeamPick`).subscribe(() => {
      this.bannerService.pushWarning("Team Pick Removed", "The team pick was successfully removed.");
    });

    level.teamPicked = false;
  }

  public AdminDeleteLevel(level: Level) {
    this.makeRequest("DELETE", `admin/levels/id/${level.levelId}`).subscribe(() => {
      this.bannerService.pushSuccess("Level Removed", "The level was successfully deleted.");
    });
  }

  public AdminGetQueuedRegistrations() {
    return this.makeListRequest<AdminQueuedRegistration>("GET", "admin/registrations");
  }

  public AdminRemoveQueuedRegistration(registration: AdminQueuedRegistration) {
    this.makeRequest("DELETE", `admin/registrations/${registration.registrationId}`).subscribe(() => {
      this.bannerService.pushSuccess(`Registration Removed`, `The queued registration for ${registration.username}/${registration.emailAddress} has been removed.`);
    });
  }

  public AdminRemoveAllQueuedRegistrations() {
    this.makeRequest("DELETE", "admin/registrations").subscribe(() => {
      this.bannerService.pushSuccess(`All Registrations Removed`, `All queued registrations have been removed.`);
    });
  }

  public AdminDeleteUserPlanets(user: User) {
    this.makeRequest("DELETE", `admin/users/uuid/${user.userId}/planets`).subscribe(() => {
      this.bannerService.pushSuccess(`Planets Removed`, `${user.username}'s planets have been removed.`);
    });
  }

  public AdminDeleteUser(user: User) {
    this.makeRequest("DELETE", `admin/users/uuid/${user.userId}`).subscribe(() => {
      this.bannerService.pushSuccess(`User Deleted`, `${user.username}'s account has been deleted.`);
    });
  }

  public AdminGetUsers(count: number, skip: number = 0) {
    return this.makeListRequest<ExtendedUser>("GET", `admin/users?count=${count}&skip=${skip}`);
  }
}

export function GetPhotoLink(photo: Photo, large: boolean = true): string {
  return GetAssetImageLink(large ? photo.largeHash : photo.smallHash);
}

export function GetAssetImageLink(hash: string | undefined): string {
  if (hash === undefined || hash === null || hash === "0" || hash.startsWith('g')) return "";
  return environment.apiBaseUrl + "/assets/" + hash + "/image";
}
