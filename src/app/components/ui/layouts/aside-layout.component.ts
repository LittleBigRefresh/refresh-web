import { Component, ChangeDetectionStrategy } from '@angular/core';

@Component({
    selector: 'app-aside-layout',
    imports: [],
    changeDetection: ChangeDetectionStrategy.Eager,
    template: `
    <div class="flex flex-row sm:flex-col md:flex-col gap-2.5">
      <div class="w-[70%] sm:w-auto md:w-auto">
        <ng-content select="[left]"></ng-content>
      </div>
      <div class="grow">
        <ng-content select="[right]"></ng-content>
      </div>
    </div>
  `
})
export class AsideLayoutComponent {

}
