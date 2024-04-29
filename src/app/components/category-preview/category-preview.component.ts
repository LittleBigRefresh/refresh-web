import {Component, Input} from '@angular/core';
import {Level} from "../../api/types/level";
import {IconProp} from "@fortawesome/fontawesome-svg-core";

@Component({
    selector: 'category-preview',
    templateUrl: './category-preview.component.html'
})
export class CategoryPreviewComponent {
    @Input("icon") public Icon: IconProp | undefined;
    @Input("category-title") public Title: string = "";
    @Input("route") public Route: string = "";
    @Input("levels") public Levels: Level[] | undefined;
    @Input("total") public Total: number = 0;
    @Input("query") public Query: string | undefined = undefined;
}
