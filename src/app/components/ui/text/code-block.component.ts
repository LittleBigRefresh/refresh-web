import { Component, ChangeDetectionStrategy } from '@angular/core';
import {ContainerComponent} from "../container.component";

@Component({
    selector: 'app-codeblock',
    imports: [
        ContainerComponent
    ],
    changeDetection: ChangeDetectionStrategy.Eager,
    template: `
    <app-container>
      <pre class="whitespace-pre-wrap"><ng-content></ng-content></pre>
    </app-container>
  `
})
export class CodeBlockComponent {

}
