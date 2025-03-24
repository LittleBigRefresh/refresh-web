import {Component, Input} from '@angular/core';
import {NavCategory} from "./navtypes";
import {FaIconComponent} from "@fortawesome/angular-fontawesome";
import { NgClass } from "@angular/common";
import {RouterLink} from "@angular/router";
import {NavbarItemComponent} from "./navbar-item.component";

@Component({
    selector: 'app-navbar-category',
    imports: [
        FaIconComponent,
        RouterLink,
        NavbarItemComponent,
        NgClass
    ],
    template: `
    <div class="group relative">
      <a [routerLink]=category.defaultRoute class="flex items-center gap-x-2 text-xl hover:underline h-14"
        [title]="category.name">
        <fa-icon [icon]=category.icon class="text-[17px] h-full content-center" [ngClass]="showNames ? '' : 'px-2.5 -mx-2.5'"></fa-icon>
        @if (showNames) {
          <span>{{ category.name }}</span>
        }
      </a>
      <div class="absolute z-[1] w-64 px-5 py-2.5 hidden group-hover:flex flex-col rounded-b bg-header-background gap-y-2 drop-shadow-md"
        [ngClass]="!right ? 'left-0' : 'right-0'">
        @for (link of category.items; track link.name) {
          <app-navbar-item [href]="link.route" [icon]="link.icon!" [title]="link.name" [iconClass]="'w-4 text-[1.1rem]'" labelClass="text-lg"></app-navbar-item>
        }
      </div>
    </div>
    `
})
export class NavbarCategoryComponent {
  @Input({required: true}) category: NavCategory = null!;
  @Input() showNames: boolean = true;

  @Input() right: boolean = false;
}
