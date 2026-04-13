import {Component, EventEmitter, Input, Output} from '@angular/core';
import {Announcement} from "../../api/types/announcement";

import {FaIconComponent} from "@fortawesome/angular-fontawesome";
import {faBullhorn, faSignOutAlt, faTrash} from "@fortawesome/free-solid-svg-icons";
import { ButtonComponent } from "../ui/form/button.component";
import { ClientService } from '../../api/client.service';
import { BannerService } from '../../banners/banner.service';
import { RefreshApiError } from '../../api/refresh-api-error';
import { ConfirmationDialogComponent } from "../ui/confirmation-dialog.component";
import { DateComponent } from "../ui/info/date.component";

@Component({
    selector: 'app-announcement',
    imports: [
    FaIconComponent,
    ButtonComponent,
    ConfirmationDialogComponent,
    DateComponent
],
    template: `
    <div class="bg-yellow rounded px-5 py-2.5">
      <div class="flex flex-row gap-x-2 justify-between">
        <div>
          <fa-icon [icon]="faBullhorn" class="pr-1.5"></fa-icon>
          <span class="text-xl font-bold word-wrap-and-break">{{data.title}}</span>
        </div>

        @if (showDeleteButton) {
          <app-button color="bg-red text-[15px]" yPadding="" [icon]="faTrash" color="bg-red" (click)="toggleDeletionDialog(true)"></app-button>
        }
      </div>
      
      <p class="word-wrap-and-break">{{data.text}}</p>

      @if (data.createdAt != null) {
        <div class="flex flex-row justify-end">
          <span class="italic">
            posted
            <app-date [date]="data.createdAt"></app-date>
          </span>
        </div>
      }
    </div>

    @defer (when showDeletionDialog) { @if (showDeletionDialog) {
      <app-confirmation-dialog infoText="Do you really want to delete this announcement?" (closeDialog)="toggleDeletionDialog(false)">
        <app-button text="Cancel" [icon]="faSignOutAlt" color="bg-secondary" (click)="toggleDeletionDialog(false)"></app-button>
        <app-button text="Delete!" [icon]="faTrash" color="bg-red" (click)="delete()"></app-button>
      </app-confirmation-dialog>
    }}
  `
})
export class AnnouncementComponent {
  @Input({required: true}) data: Announcement = undefined!;
  @Input() showDeleteButton: boolean = false;
  @Output() deleted = new EventEmitter;

  protected showDeletionDialog: boolean = false;

  constructor(protected client: ClientService, protected banner: BannerService) {

  }

  protected toggleDeletionDialog(visibility: boolean) {
    this.showDeletionDialog = visibility;
  }

  protected delete() {
    if (this.data.announcementId.length == 0) return; // fake announcement which doesn't exist on the server
    this.toggleDeletionDialog(false);

    this.client.deleteAnnouncementByUuid(this.data.announcementId).subscribe({
      error: error => {
        const apiError: RefreshApiError | undefined = error.error?.error;
        this.banner.error("Announcement deletion failed", apiError == null ? error.message : apiError.message);
      },
      next: _ => {
        this.banner.success("Announcement successfully deleted!", "");
        this.deleted.emit();
      }
    });
  }

  protected readonly faBullhorn = faBullhorn;
  protected readonly faTrash = faTrash;
  protected readonly faSignOutAlt = faSignOutAlt;
}
