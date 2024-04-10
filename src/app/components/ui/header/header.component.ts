import { Component } from '@angular/core';
import {NgOptimizedImage} from "@angular/common";

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [
    NgOptimizedImage
  ],
  template: `
    <div class="flex items-center bg-header-background gap-x-2.5 px-5 py-1 leading-none">
      <img ngSrc="/assets/logo.svg" alt="Refresh Logo" width="48" height="48">
      
      <div class="mx-1.5 w-[3px] rounded-full h-11 bg-divider"></div>
    </div>
  `
})
export class HeaderComponent {

}
