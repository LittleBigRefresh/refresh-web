import { Component } from '@angular/core';

@Component({
  selector: 'app-aside-layout',
  standalone: true,
  imports: [],
  template: `
    <div class="flex max-md:flex-col gap-2.5">
      <div class="lg:w-[70%]">
        <ng-content select="[left]"></ng-content>
      </div>
      <div class="lg:grow">
        <ng-content select="[right]"></ng-content>
      </div>
    </div>
  `
})
export class AsideLayoutComponent {

}
