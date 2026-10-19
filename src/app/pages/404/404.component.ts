import { Component, ChangeDetectionStrategy } from '@angular/core';
import {PageTitleComponent} from "../../components/ui/text/page-title.component";

@Component({
    selector: 'app-404',
    imports: [
        PageTitleComponent
    ],
    templateUrl: './404.component.html',
    changeDetection: ChangeDetectionStrategy.Eager,
    styles: ``
})
export class NotFoundComponent {

}
