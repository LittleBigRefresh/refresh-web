import {Component, OnInit} from '@angular/core';
import {LevelCategory} from "../../api/types/levels/level-category";
import {ClientService} from "../../api/client.service";
import {ActivatedRoute} from "@angular/router";
import {PageTitleComponent} from "../../components/ui/page-title.component";
import {NgForOf, NgIf} from "@angular/common";
import {CategoriesComponent} from "../categories/categories.component";
import {ResponsiveGridComponent} from "../../components/ui/responsive-grid.component";
import {Level} from "../../api/types/levels/level";
import {LevelPreviewComponent} from "../../components/items/level-preview.component";
import {ContainerComponent} from "../../components/ui/container.component";

@Component({
  selector: 'app-level-listing',
  standalone: true,
  imports: [
    PageTitleComponent,
    NgIf,
    CategoriesComponent,
    ResponsiveGridComponent,
    LevelPreviewComponent,
    NgForOf,
    ContainerComponent
  ],
  templateUrl: './level-listing.component.html'
})
export class LevelListingComponent implements OnInit {
  category: LevelCategory | null | undefined = undefined;
  levels: Level[] | undefined = undefined;

  constructor(private client: ClientService, private route: ActivatedRoute) {
    // Start requesting category information immediately.
    this.client.getLevelCategories().subscribe();
  }

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      const route: string | null = params.get('category');

      if(route == null) {
        this.category = null;
        return;
      }

      this.client.getLevelsInCategory(route).subscribe(data => {
        this.levels = data;
      });
      this.setCategoryByRoute(route);
    })
  }

  setCategoryByRoute(route: string) {
    this.client.getLevelCategories().subscribe(list => {
      for (let category of list) {
        if (category.apiRoute != route) continue;

        this.category = category;
        return;
      }

      // if we're still here without a category, set as null (marker for not found)
      if(this.category === undefined)
        this.category = null;
    });
  }
}
