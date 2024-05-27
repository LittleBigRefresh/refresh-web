import {Component, Input} from '@angular/core';
import {NavCategory} from "./navtypes";
import {FaIconComponent} from "@fortawesome/angular-fontawesome";
import {NgForOf, NgIf} from "@angular/common";
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
    NgForOf
  ],
  template: `
    <div class="group">
      <a [routerLink]=category.defaultRoute class="flex items-center gap-x-2 text-xl hover:underline h-14"
         [title]="category.name">
        <fa-icon [icon]=category.icon></fa-icon>
        <span *ngIf="showNames">{{ category.name }}</span>
      </a>
      <div class="absolute z-[1] w-64 px-5 py-2.5 hidden group-hover:flex flex-col rounded-b bg-header-background gap-y-2">
        <app-navbar-item *ngFor="let link of category.items" [href]="link.route" [icon]="link.icon!" [title]="link.name" class="text-xl"></app-navbar-item>
      </div>
    </div>
  `
})
export class NavbarCategoryComponent {
  @Input({required: true}) category: NavCategory = null!;
  @Input() showNames: boolean = true;
}
