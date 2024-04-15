import {Injectable} from '@angular/core';
import {HttpClient, HttpParams} from "@angular/common/http";
import {Instance} from "./types/instance";
import {LazySubject} from "./lazy-subject";
import {LevelCategory} from "./types/levels/level-category";
import {Room} from "./types/rooms/room";
import {Level} from "./types/levels/level";

const defaultPageSize: number = 40;

@Injectable({
  providedIn: 'root'
})
export class ClientService {
  private readonly instance: LazySubject<Instance>;
  private readonly categories: LazySubject<LevelCategory[]>;

  constructor(private http: HttpClient) {
    this.instance = new LazySubject<Instance>(() => this.http.get<Instance>("/instance"));
    this.instance.tryLoad();

    this.categories = new LazySubject<LevelCategory[]>(() => this.http.get<LevelCategory[]>("/levels?includePreviews=true"))
  }

  private createPageQuery(count: number, skip: number) {
    return new HttpParams()
        .set('count', count)
        .set('skip', skip);
  }

  getInstance() {
    return this.instance.asObservable();
  }

  getLevelCategories() {
    return this.categories.asObservable();
  }

  getRoomListing() {
    return this.http.get<Room[]>("/rooms");
  }

  getLevelsInCategory(category: string, count: number = defaultPageSize, skip: number = 0) {
    return this.http.get<Level[]>(`/levels/${category}`, {params: this.createPageQuery(count, skip)});
  }
}
