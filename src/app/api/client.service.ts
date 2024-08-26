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
import {Observable} from "rxjs";
import {Params} from "@angular/router";
import {ApiImplementation} from "./api-implementation";
import {Contest} from "./types/contests/contest";

export const defaultPageSize: number = 40;

@Injectable({
  providedIn: 'root'
})
export class ClientService extends ApiImplementation {
  private readonly instance: LazySubject<Instance>;
  private readonly categories: LazySubject<ListWithData<LevelCategory>>;

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

  getLevelsInCategory(category: string, skip: number = 0, count: number = defaultPageSize, params: Params | null = null) {
    return this.http.get<ListWithData<Level>>(`/levels/${category}`, {params: this.setPageQuery(params, skip, count)});
  }

  getLevelById(id: number) {
    return this.http.get<Level>(`/levels/id/${id}`);
  }

  getUserByUuid(userId: string) {
    return this.http.get<User>(`/users/uuid/${userId}`);
  }

  getUserByUsername(username: string) {
    return this.http.get<User>(`/users/name/${username}`);
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

  getPhotos(skip: number = 0, count: number = defaultPageSize) {
    return this.http.get<ListWithData<Photo>>(`/photos`, {params: this.createPageQuery(skip, count)});
  }

  getContests() {
    return this.http.get<ListWithData<Contest>>("/contests");
  }

  getPhotoById(id: number) {
    return this.http.get<Photo>(`/photos/id/${id}`);
  }
}
