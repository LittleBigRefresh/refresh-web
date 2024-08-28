import {Component} from '@angular/core';
import {faSearch} from "@fortawesome/free-solid-svg-icons";
import {NavbarItemComponent} from "../components/ui/header/navbar-item.component";
import {DialogComponent} from "../components/ui/dialog.component";
import {FaIconComponent} from "@fortawesome/angular-fontawesome";
import { AsyncPipe } from "@angular/common";
import {SearchBarComponent} from "../components/ui/form/search-bar.component";
import {FormComponent} from "../components/ui/form/form.component";
import {FormControl, FormGroup} from "@angular/forms";
import {Router} from "@angular/router";
import {LayoutService} from "../services/layout.service";
import {DividerComponent} from "../components/ui/divider.component";
import {LevelPreviewComponent} from "../components/items/level-preview.component";
import {Scrollable} from "../helpers/scrollable";
import {Level} from "../api/types/levels/level";
import {defaultListInfo, RefreshApiListInfo} from "../api/refresh-api-list-info";
import {ClientService, defaultPageSize} from "../api/client.service";
import {ButtonComponent} from "../components/ui/form/button.component";
import {ContainerComponent} from "../components/ui/container.component";

@Component({
  selector: 'app-search',
  standalone: true,
  imports: [
    NavbarItemComponent,
    DialogComponent,
    FaIconComponent,
    SearchBarComponent,
    AsyncPipe,
    FormComponent,
    DividerComponent,
    LevelPreviewComponent,
    ButtonComponent,
    ContainerComponent
],
  template: `
    <a class="flex gap-x-2 text-[17px] font-normal cursor-pointer" title="Search" (click)="toggleModal()">
      <fa-icon [icon]=faSearch class="w-5 text-center"></fa-icon>
    </a>
    
    @if (show) {
      <app-dialog>
        <div class="w-[640px] h-full m-5 flex flex-col">
          @if (!(layout.isMobile | async)) {
            <app-form [form]="searchForm" [compact]="true" (submit)="search()" class="">
              <app-search-bar [form]="searchForm" appClass="min-w-full"></app-search-bar>
            </app-form>
          }
        </div>
        @if (results.length > 0) {
          <app-divider></app-divider>
        }
        <div class="flex flex-col gap-y-2">
          @for (level of results; track level) {
            <app-container>
              <app-level-preview [level]="level"></app-level-preview>
            </app-container>
          }
        </div>
        @if (showMoreButton) {
          <app-button text="Show More..."></app-button>
        }
      </app-dialog>
    }
    `,
  styles: ``
})
export class SearchComponent {
  protected show: boolean = false;
  protected results: Level[] = [];
  protected showMoreButton: boolean = false;

  protected searchForm = new FormGroup({
    query: new FormControl(),
  });

  constructor(private client: ClientService, private router: Router, protected layout: LayoutService) {}

  toggleModal(): void {
    this.show = !this.show;
  }

  search() {
    const query = this.searchForm.controls.query.getRawValue();
    this.client.getLevelsInCategory("search", 0, 5, {"query": query}).subscribe(list => {
      this.results = list.data;
      this.showMoreButton = list.listInfo.totalItems > 5;
    });
  }

  protected readonly faSearch = faSearch;
}
