import { Component } from '@angular/core';
import {PageTitleComponent} from "../../components/ui/text/page-title.component";
import {ResponsiveGridComponent} from "../../components/ui/responsive-grid.component";
import {UserCategory} from "../../api/types/categories/user-category";
import {ClientService} from "../../api/client.service";


import {UserCategoryComponent} from "../../components/items/user-category.component";

@Component({
    selector: 'app-categories',
    imports: [
        PageTitleComponent,
        ResponsiveGridComponent,
        UserCategoryComponent
    ],
    templateUrl: './user-categories-component.html'
})
export class UserCategoriesComponent {
    categories: UserCategory[] | undefined;

    constructor(client: ClientService) {
        client.getUserCategories().subscribe(list => {
            this.categories = list.data.filter(c => !c.requiresUser && !c.hidden);
        })
    }
}
