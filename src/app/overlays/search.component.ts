import { Component } from '@angular/core';
import {faSearch} from "@fortawesome/free-solid-svg-icons";
import {NavbarItemComponent} from "../components/ui/header/navbar-item.component";
import {DialogComponent} from "../components/ui/dialog.component";
import {FaIconComponent} from "@fortawesome/angular-fontawesome";
import {AsyncPipe, NgIf} from "@angular/common";
import {SearchBarComponent} from "../components/ui/form/search-bar.component";
import {FormComponent} from "../components/ui/form/form.component";
import {FormControl, FormGroup} from "@angular/forms";
import {Router} from "@angular/router";
import {LayoutService} from "../services/layout.service";

@Component({
  selector: 'app-search',
  standalone: true,
  imports: [
    NavbarItemComponent,
    DialogComponent,
    FaIconComponent,
    NgIf,
    SearchBarComponent,
    AsyncPipe,
    FormComponent
  ],
  template: `
    <a class="flex gap-x-2 text-[17px] font-normal cursor-pointer" title="Search" (click)="toggleModal()">
      <fa-icon [icon]=faSearch class="w-5 text-center"></fa-icon>
    </a>
    
    <app-dialog *ngIf="show">
      <div class="w-[640px] p-5">
        <app-form [form]="searchForm" [compact]="true" (submit)="search()" *ngIf="!(layout.isMobile | async)" class="">
          <div class="flex flex-col">
            <app-search-bar [form]="searchForm" appClass="min-w-full"></app-search-bar>
          </div>
        </app-form>
      </div>
    </app-dialog>
  `,
  styles: ``
})
export class SearchComponent {
  protected show: boolean = false;

  protected searchForm = new FormGroup({
    query: new FormControl(),
  });

  constructor(private router: Router, protected layout: LayoutService) {}

  toggleModal(): void {
    this.show = !this.show;
  }

  search() {
    const query: string = this.searchForm.controls.query.getRawValue();
    this.router.navigate(["/levels/search"], {queryParams: {query: query}})
  }

  protected readonly faSearch = faSearch;
}
