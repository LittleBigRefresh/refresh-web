import {Component, Input} from '@angular/core';
import {NavCategory} from "./navtypes";
import {FaIconComponent} from "@fortawesome/angular-fontawesome";
import {NgClass, NgForOf, NgIf} from "@angular/common";
import {RouterLink} from "@angular/router";
import {NavbarItemComponent} from "./navbar-item.component";

@Component({
  selector: 'app-navbar-category',
  standalone: true,
  imports: [
    FaIconComponent,
    NgIf,
    RouterLink,
    NavbarItemComponent,
    NgForOf,
    NgClass
  ],
  template: `
    <div class="group relative">
      <a [routerLink]=category.defaultRoute class="flex items-center gap-x-2 text-xl hover:underline h-14"
         [title]="category.name">
        <fa-icon [icon]=category.icon class="h-full content-center" [ngClass]="showNames ? '' : 'px-2.5 -mx-2.5'"></fa-icon>
        <span *ngIf="showNames">{{ category.name }}</span>
      </a>
      <div class="absolute z-[1] w-64 px-5 py-2.5 hidden group-hover:flex flex-col rounded-b bg-header-background gap-y-2"
           [ngClass]="!right ? 'left-0' : 'right-0'">
        <app-navbar-item *ngFor="let link of category.items" [href]="link.route" [icon]="link.icon!" [title]="link.name"></app-navbar-item>
      </div>
    </div>
  `
})
export class NavbarCategoryComponent {
  @Input({required: true}) category: NavCategory = null!;
  @Input() showNames: boolean = true;

  @Input() right: boolean = false;
}
