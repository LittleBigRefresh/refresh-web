import {Component, Input} from '@angular/core';
import {NavCategory} from "../navtypes";


import {FaIconComponent} from "@fortawesome/angular-fontawesome";
import {NavbarItemComponent} from "../navbar-item.component";

@Component({
    selector: 'app-header-navbar-section-mobile',
    imports: [
    FaIconComponent,
    NavbarItemComponent
],
    template: `
    <div class="bg-backdrop rounded-md px-2.5 py-1 flex flex-row gap-x-1.5 text-lg">
      <fa-icon [icon]="category.icon"></fa-icon>
      <span>{{category.name}}</span>
    </div>
    <div class="flex flex-col gap-y-1 pt-2">
      @for (item of category.items; track item.route) {
        <app-navbar-item [icon]="item.icon" [title]="item.name" [href]="item.route" iconClass="w-4 text-[1.1rem]" labelClass="text-md"></app-navbar-item>
      }
    </div>
  `
})
export class HeaderNavbarSectionMobileComponent {
  @Input({required: true}) category: NavCategory = null!;
}
