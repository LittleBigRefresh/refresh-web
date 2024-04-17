import {Component, Input} from '@angular/core';
import {LevelCategory} from "../../api/types/levels/level-category";
import {ContainerComponent} from "../ui/container.component";
import {RouterLink} from "@angular/router";
import {FaIconComponent} from "@fortawesome/angular-fontawesome";
import {faLink} from "@fortawesome/free-solid-svg-icons";
import {ContainerTitleComponent} from "../ui/text/container-title.component";
import {NgIf} from "@angular/common";
import {DividerComponent} from "../ui/divider.component";
import {LevelPreviewComponent} from "./level-preview.component";

@Component({
  selector: 'app-level-category',
  standalone: true,
  imports: [
    ContainerComponent,
    RouterLink,
    FaIconComponent,
    ContainerTitleComponent,
    NgIf,
    DividerComponent,
    LevelPreviewComponent
  ],
  template: `
    <app-container>
      <app-container-title>
        <a [routerLink]="'/levels/' + category.apiRoute">
          <fa-icon [icon]=category.fontAwesomeIcon class="mr-2"></fa-icon>
          <span>{{category.name}}</span>
          <fa-icon [icon]=faLink class="text-gentle text-sm ml-1"></fa-icon>
        </a>
      </app-container-title>
      
      <p>{{category.description}}</p>
      
      <ng-container *ngIf=category.previewLevel>
        <app-divider></app-divider>
        <app-level-preview [level]=category.previewLevel></app-level-preview>
      </ng-container>
    </app-container>
  `
})
export class LevelCategoryComponent {
  @Input({required: true}) category!: LevelCategory;
  protected readonly faLink = faLink;
}
