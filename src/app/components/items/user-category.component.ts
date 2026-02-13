import {Component, Input} from '@angular/core';
import {UserCategory} from "../../api/types/categories/user-category";
import {ContainerComponent} from "../ui/container.component";
import {RouterLink} from "@angular/router";
import {FaIconComponent} from "@fortawesome/angular-fontawesome";
import {faLink} from "@fortawesome/free-solid-svg-icons";
import {ContainerTitleComponent} from "../ui/text/container-title.component";

import {DividerComponent} from "../ui/divider.component";
import {UserPreviewComponent} from "./user-preview.component";

@Component({
    selector: 'app-user-category',
    imports: [
        ContainerComponent,
        RouterLink,
        FaIconComponent,
        ContainerTitleComponent,
        DividerComponent,
        UserPreviewComponent
    ],
    template: `
    <app-container>
      <app-container-title>
        <a [routerLink]="'/users/' + category.apiRoute" class="underline">
          <fa-icon [icon]=category.fontAwesomeIcon class="mr-2"></fa-icon>
          <span>{{category.name}}</span>
        </a>
      </app-container-title>
    
      <p>{{category.description}}</p>
    
      @if (category.previewUser) {
        <app-divider></app-divider>
        <app-user-preview [user]=category.previewUser></app-user-preview>
      }
    </app-container>
    `
})
export class UserCategoryComponent {
  @Input({required: true}) category!: UserCategory;
  protected readonly faLink = faLink;
}
