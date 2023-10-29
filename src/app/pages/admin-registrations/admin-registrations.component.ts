import {Component, OnInit} from '@angular/core';
import {AdminQueuedRegistration} from "../../api/types/admin/admin-queued-registration";
import {ApiClient} from "../../api/api-client.service";
import * as moment from "dayjs";
import {faTrash} from "@fortawesome/free-solid-svg-icons";

@Component({
  selector: 'app-admin-registrations',
  templateUrl: './admin-registrations.component.html'
})
export class AdminRegistrationsComponent implements OnInit {
  registrations: AdminQueuedRegistration[] | undefined;

  constructor(private apiClient: ApiClient) {}

  ngOnInit() {
    this.apiClient.AdminGetQueuedRegistrations().subscribe((data) => {
      this.registrations = data.items;
    });
  }

  getMoment(timestamp: Date): string {
    return moment(timestamp).fromNow();
  }

  remove(registration: AdminQueuedRegistration): void {
    this.apiClient.AdminRemoveQueuedRegistration(registration);
    this.ngOnInit();
  }

  clearAll(): void {
    this.apiClient.AdminRemoveAllQueuedRegistrations();
    this.ngOnInit();
  }

  protected readonly faTrash = faTrash;
}
