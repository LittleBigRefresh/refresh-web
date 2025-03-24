import { Component } from '@angular/core';
import {PageTitleComponent} from "../../components/ui/text/page-title.component";
import {ResponsiveGridComponent} from "../../components/ui/responsive-grid.component";
import {LevelCategory} from "../../api/types/levels/level-category";
import {ClientService} from "../../api/client.service";
import {ContainerComponent} from "../../components/ui/container.component";

import {LevelCategoryComponent} from "../../components/items/level-category.component";

@Component({
    selector: 'app-categories',
    imports: [
        PageTitleComponent,
        ResponsiveGridComponent,
        ContainerComponent,
        LevelCategoryComponent
    ],
    templateUrl: './categories.component.html'
})
export class CategoriesComponent {
  categories: LevelCategory[] | undefined;

  constructor(client: ClientService) {
    client.getLevelCategories().subscribe(list => {
      this.categories = list.data.filter(c => !c.requiresUser && !c.hidden);
    })
  }
}
