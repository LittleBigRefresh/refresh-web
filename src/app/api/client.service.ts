import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Instance} from "./types/instance";

@Injectable({
  providedIn: 'root'
})
export class ClientService {

  constructor(private http: HttpClient) {}

  getInstance() {
    return this.http.get<Instance>("/instance")
  }
}
