import {Component, Input} from '@angular/core';
import {LevelCategory} from "../../api/types/categories/level-category";
import {ContainerComponent} from "../ui/container.component";
import {RouterLink} from "@angular/router";
import {FaIconComponent} from "@fortawesome/angular-fontawesome";
import {faLink} from "@fortawesome/free-solid-svg-icons";
import {ContainerTitleComponent} from "../ui/text/container-title.component";

import {DividerComponent} from "../ui/divider.component";
import {LevelPreviewComponent} from "./level-preview.component";

@Component({
    selector: 'app-level-category',
    imports: [
        ContainerComponent,
        RouterLink,
        FaIconComponent,
        ContainerTitleComponent,
        DividerComponent,
        LevelPreviewComponent
    ],
    template: `
    <app-container>
      <app-container-title>
        <a [routerLink]="'/levels/' + category.apiRoute" class="underline">
          <fa-icon [icon]=category.fontAwesomeIcon class="mr-2"></fa-icon>
          <span>{{category.name}}</span>
        </a>
      </app-container-title>
    
      <p>{{category.description}}</p>
    
      @if (category.previewLevel) {
        <app-divider></app-divider>
        <app-level-preview [level]=category.previewLevel></app-level-preview>
      }
    </app-container>
    `
})
export class LevelCategoryComponent {
  @Input({required: true}) category!: LevelCategory;
  protected readonly faLink = faLink;
}
