import { Component } from '@angular/core';
import {PageTitleComponent} from "../../components/ui/text/page-title.component";

@Component({
  selector: 'app-404',
  standalone: true,
  imports: [
    PageTitleComponent
  ],
  templateUrl: './404.component.html',
  styles: ``
})
export class NotFoundComponent {

}
