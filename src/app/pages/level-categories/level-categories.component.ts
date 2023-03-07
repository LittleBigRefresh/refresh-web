import { Component } from '@angular/core';
import { IconLookup, IconName, IconProp } from '@fortawesome/fontawesome-svg-core';
import { ApiClient } from 'src/app/api/api-client';
import { Category } from 'src/app/api/types/category';

@Component({
  selector: 'app-level-categories',
  templateUrl: './level-categories.component.html',
  styleUrls: ['./level-categories.component.scss']
})
export class LevelCategoriesComponent {
  categories: Category[] = []
  constructor(private apiClient: ApiClient) { }

  ngOnInit(): void {
    this.apiClient.GetLevelCategories()
      .subscribe(data => {
        this.categories = []

        for(let c of data) {
          // if the endpoint requires a user but we're not signed in, skip it
          // if either of those conditions aren't met add it to the list

          if(c.RequiresUser) {
            if(this.apiClient.IsSignedIn())
              this.categories.push(c);
          } else {
            this.categories.push(c);
          }
        }
      });
  }

  getIcon(name: string): IconProp {
    return name as IconName;
  }
}
