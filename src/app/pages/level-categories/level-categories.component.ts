import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { Category } from './category';

@Component({
  selector: 'app-level-categories',
  templateUrl: './level-categories.component.html',
  styleUrls: ['./level-categories.component.scss']
})
export class LevelCategoriesComponent {
  categories!: Category[]
  constructor(private httpClient: HttpClient) { }

  ngOnInit(): void {
    this.httpClient.get<Category[]>("http://localhost:10061/api/v2/levels")
      .subscribe(data => this.categories = data);
  }
}
