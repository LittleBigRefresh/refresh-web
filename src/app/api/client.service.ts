import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Instance} from "./types/instance";
import {BehaviorSubject, filter, Observable, take} from "rxjs";

// Subscribes to a BehaviourSubject from a source observable, but only fires when an actual value is set.
// Useful for avoiding duplicate, common requests.
class LazySubject<TData> {
  private subject: BehaviorSubject<TData> = new BehaviorSubject<TData>(undefined!);
  private madeRequest: boolean = false;
  private observable: () => Observable<TData>;

  constructor(observable: () => Observable<TData>) {
    this.observable = observable
  }

  private consumeObservable() {
    this.observable().subscribe(data => {
      this.subject.next(data);
    })
  }

  asObservable() {
    if(!this.madeRequest) {
      this.consumeObservable();
    }

    return this.subject.asObservable().pipe(
        filter(value => value !== undefined),
        take(1)
    );
  }
}

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
