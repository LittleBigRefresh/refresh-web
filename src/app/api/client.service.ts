import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Instance} from "./types/instance";
import {LazySubject} from "../helpers/lazy-subject";
import {LevelCategory} from "./types/levels/level-category";
import {Room} from "./types/rooms/room";
import {Level} from "./types/levels/level";
import {ListWithData} from "./list-with-data";
import {User} from "./types/users/user";
import {ActivityPage} from "./types/activity/activity-page";
import {Photo} from "./types/photos/photo";
import {BehaviorSubject, Observable, tap} from "rxjs";
import {Params} from "@angular/router";
import {ApiImplementation} from "./api-implementation";
import {Contest} from "./types/contests/contest";
import {Score} from "./types/levels/score";
import { LevelRelations } from './types/levels/level-relations';

export const defaultPageSize: number = 40;

@Injectable({
  providedIn: 'root'
})
export class ClientService extends ApiImplementation {
  private readonly instance: LazySubject<Instance>;
  private readonly categories: LazySubject<ListWithData<LevelCategory>>;
  
  private usersCache: User[] = [];

  constructor(http: HttpClient) {
    super(http);
    this.instance = new LazySubject<Instance>(() => this.http.get<Instance>("/instance"));
    this.instance.tryLoad();

    this.categories = new LazySubject<ListWithData<LevelCategory>>(() => this.http.get<ListWithData<LevelCategory>>("/levels?includePreviews=true"))
  }

  getInstance() {
    return this.instance.asObservable();
  }

  getLevelCategories() {
    return this.categories.asObservable();
  }

  getRoomListing() {
    return this.http.get<ListWithData<Room>>("/rooms");
  }

  getLevelsInCategory(category: string, skip: number = 0, count: number = defaultPageSize, params: Params | null = null, username?: string) {
    return this.http.get<ListWithData<Level>>(`/levels/${category}`, {params: this.setPageQuery(params, skip, count, username)});
  }

  getLevelById(id: number) {
    return this.http.get<Level>(`/levels/id/${id}`);
  }
  
  getScoresForLevel(id: number, scoreType: number, skip: number, count: number = defaultPageSize, params: Params | null = null) {
    return this.http.get<ListWithData<Score>>(`/scores/${id}/${scoreType}`, {params: this.setPageQuery(params, skip, count)});
  }
  
  private getUser(route: string, cacheLookup: (value: User, index: number, obj: User[]) => boolean): Observable<User> {
    const existingUser: User | undefined = this.usersCache.find(cacheLookup);
    if (existingUser) {
      // console.log("found in cache", existingUser);
      return new BehaviorSubject(existingUser);
    }

    return this.http.get<User>("/users/" + route)
        .pipe(tap(d => {
          // console.log("adding to cache", d)
          this.usersCache.push(d);
        }));
  }

  getUserByUuid(userId: string): Observable<User> {
    return this.getUser("uuid/" + userId, u => u.userId == userId)
  }

  getUserByUsername(username: string) {
    return this.getUser("name/" + username, u => u.username == username)
  }

  getUserByEitherLookup(username: string | undefined, uuid: string | undefined): Observable<User> {
    if(!username && !uuid) {
      throw new Error("no username or uuid was provided for lookup");
    }

    if(username) return this.getUserByUsername(username);
    else return this.getUserByUuid(uuid!)
  }

  getActivityPage(skip: number = 0, count: number = defaultPageSize) {
    return this.http.get<ActivityPage>(`/activity`, {params: this.createPageQuery(skip, count)});
  }

  getActivityPageForLevel(levelId: number,  skip: number = 0, count: number = defaultPageSize) {
    return this.http.get<ActivityPage>(`/levels/id/${levelId}/activity`, {params: this.createPageQuery(skip, count)});
  }

  getPhotos(skip: number = 0, count: number = defaultPageSize) {
    return this.http.get<ListWithData<Photo>>(`/photos`, {params: this.createPageQuery(skip, count)});
  }

  getContests() {
    return this.http.get<ListWithData<Contest>>("/contests");
  }

  getPhotoById(id: number) {
    return this.http.get<Photo>(`/photos/id/${id}`);
  }

  getLevelRelations(id: number) {
    return this.http.get<LevelRelations>(`/levels/id/${id}/relations`);
  }

  setLevelAsHearted(id: number) {
    return this.http.post<Response>(`/levels/id/${id}/heart`, null);
  }

  setLevelAsUnhearted(id: number) {
    return this.http.post<Response>(`/levels/id/${id}/unheart`, null);
  }

  setLevelAsQueued(id: number) {
    return this.http.post<Response>(`/levels/id/${id}/queue`, null);
  }

  setLevelAsDequeued(id: number) {
    return this.http.post<Response>(`/levels/id/${id}/dequeue`, null);
  }

  setLevelAsOverride(id: number) {
    return this.http.post<Response>(`/levels/id/${id}/setAsOverride`, null);
  }
}
