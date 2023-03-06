import { Component } from '@angular/core';
import { ApiClient } from 'src/app/api/api-client';
import { Category } from 'src/app/api/category';

@Component({
  selector: 'app-level-categories',
  templateUrl: './level-categories.component.html',
  styleUrls: ['./level-categories.component.scss']
})
export class LevelCategoriesComponent {
  categories!: Category[]
  constructor(private apiClient: ApiClient) { }

  ngOnInit(): void {
    this.apiClient.GetLevelCategories()
      .subscribe(data => this.categories = data);
  }
}
