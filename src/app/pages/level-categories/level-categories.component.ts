import {Component, OnInit} from '@angular/core';
import { IconName, IconProp } from '@fortawesome/fontawesome-svg-core';
import {ApiClient, GetAssetImageLink} from 'src/app/api/api-client';
import { Category } from 'src/app/api/types/category';
import {GenerateEmptyList, masonryOptions} from "../../app.component";
import {TitleService} from "../../services/title.service";

@Component({
  selector: 'app-level-categories',
  templateUrl: './level-categories.component.html',
})
export class LevelCategoriesComponent implements OnInit {
  categories: Category[] | undefined = undefined!

  constructor(private apiClient: ApiClient, titleService: TitleService) {
    titleService.setTitle("Categories");
  }
  ngOnInit(): void {
    this.apiClient.GetLevelCategories()
      .subscribe(data => {
        if(data == undefined) return;
        this.categories = []

        for(let c of data) {
          // if the endpoint requires a user, but we're not signed in, skip it
          // if either of those conditions aren't met add it to the list

          if(c.requiresUser) {
            if(this.apiClient.user !== undefined)
              this.categories.push(c);
          }
          else if(c.apiRoute == "search") {
            // do nothing
          } else {
            this.categories.push(c);
          }
        }
      });
  }

  getIcon(name: string): IconProp {
    return name as IconName;
  }

  protected readonly GetAssetImageLink = GetAssetImageLink;
  protected readonly GenerateEmptyList = GenerateEmptyList;
  protected readonly masonryOptions = masonryOptions;
}
