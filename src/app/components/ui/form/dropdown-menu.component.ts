import {Component, Injectable, Input} from '@angular/core';
import {ReactiveFormsModule} from "@angular/forms";
import { NgClass } from "@angular/common";

@Component({
    selector: 'app-dropdown-menu',
    imports: [
    ReactiveFormsModule,
    NgClass
],
    template: `
        <div class="flex flex-row content-center space-x-1 group relative">
            <ng-content select="[trigger]"></ng-content>
            <div class="absolute z-1 flex flex-col gap-y-1.5 px-5 py-2.5 rounded bg-header-background
                border-4 border-backdrop border-solid"
                [ngClass]="(showMenu ? '' : 'hidden ') + offsets + ' w-' + width">
                <ng-content select="[content]"></ng-content>
            </div>
        </div>
    `
})
@Injectable({
    providedIn: 'root'
})
export class DropdownMenuComponent {
  @Input() offsets: string = ""
  @Input({required: true}) width: number = 0;

  @Input() showMenu: boolean = false;
}
