import {Component, EventEmitter, Input, Output} from '@angular/core';
import { DialogComponent } from "./dialog.component";
import { PageTitleComponent } from "./text/page-title.component";

@Component({
    selector: 'app-confirmation-dialog',
    imports: [
    DialogComponent,
    PageTitleComponent
],
    template: `
    <app-dialog class="flex flex-row flex-grow" (onDialogClose)="close()">
        <div class="w-full h-full m-5 flex flex-col">
            <app-page-title [title]="infoText"></app-page-title>
            <div class="flex flex-row gap-x-6 justify-between mt-10">
                <ng-content></ng-content>
            </div>
        </div>
    </app-dialog>
  `
})
export class ConfirmationDialogComponent {
    @Input() infoText: string = "Text!!!!";
    @Output() closeDialog = new EventEmitter;

    close() {
        this.closeDialog.emit();
    }
}
