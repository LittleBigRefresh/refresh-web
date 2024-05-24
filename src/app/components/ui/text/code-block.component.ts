import { Component } from '@angular/core';
import {ContainerComponent} from "../container.component";

@Component({
  selector: 'app-codeblock',
  standalone: true,
  imports: [
    ContainerComponent
  ],
  template: `
    <app-container>
      <pre class="whitespace-pre-wrap"><ng-content></ng-content></pre>
    </app-container>
  `
})
export class CodeBlockComponent {

}
