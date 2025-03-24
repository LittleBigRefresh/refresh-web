import {Component} from '@angular/core';
import {DialogComponent} from "../../dialog.component";
import {FaIconComponent} from "@fortawesome/angular-fontawesome";
import {faBars, faXmark} from "@fortawesome/free-solid-svg-icons";
import {navTree, rightNavTree} from '../navtypes';
import {HeaderNavbarSectionMobileComponent} from "./header-navbar-section-mobile.component";
import {DividerComponent} from "../../divider.component";

@Component({
    selector: 'app-header-navbar-mobile',
    imports: [
        DialogComponent,
        FaIconComponent,
        HeaderNavbarSectionMobileComponent,
        DividerComponent
    ],
    template: `
    <fa-icon [icon]="show ? faXmark : faBars" class="text-3xl" (click)="toggleModal()"></fa-icon>
    
    @defer (when show) { @if (show) {
      <div class="backdrop-brightness-50 absolute left-0 top-[60px] z-[1001] w-full">
        <div class="bg-header-background h-[100vh] w-64 font-normal px-5 py-2.5 flex flex-col gap-y-4">
          @for(category of navTree; track category.name) {
            <app-header-navbar-section-mobile [category]="category"></app-header-navbar-section-mobile>
          }
          <app-divider></app-divider>
          @for(category of rightNavTree; track category.name) {
            <app-header-navbar-section-mobile [category]="category"></app-header-navbar-section-mobile>
          }
        </div>
      </div>
    }}
  `
})
export class HeaderNavbarMobileComponent {
  protected show: boolean = false;

  toggleModal(): void {
    this.show = !this.show;
  }

  protected readonly navTree = navTree;
  protected readonly rightNavTree = rightNavTree;
  
  protected readonly faBars = faBars;
  protected readonly faXmark = faXmark;
}
