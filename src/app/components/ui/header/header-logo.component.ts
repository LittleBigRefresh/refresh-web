import { Component, ChangeDetectionStrategy } from '@angular/core';
import {NgOptimizedImage} from "@angular/common";
import {RouterLink} from "@angular/router";

@Component({
    selector: 'app-header-logo',
    imports: [
        NgOptimizedImage,
        RouterLink
    ],
    changeDetection: ChangeDetectionStrategy.Eager,
    template: `
    <a routerLink="/" title="Home" class="py-1">
      <img ngSrc="/assets/logo.svg" alt="Refresh Logo" width="48" height="48" priority>
    </a>
  `
})
export class HeaderLogoComponent {

}
