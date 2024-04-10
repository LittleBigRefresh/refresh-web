import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Instance} from "./types/instance";
import {LazySubject} from "./lazy-subject";

@Injectable({
  providedIn: 'root'
})
export class ClientService {
  private readonly instance: LazySubject<Instance>;

  constructor(private http: HttpClient) {
    this.instance = new LazySubject<Instance>(() => this.http.get<Instance>("/instance"))
  }

  getInstance() {
    return this.instance.asObservable();
  }
}
