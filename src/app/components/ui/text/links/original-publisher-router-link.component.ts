import {Component, Input} from '@angular/core';
import {RouterLink} from "@angular/router";
import { Level } from '../../../../api/types/levels/level';

@Component({
    selector: 'app-original-publisher-router-link',
    imports: [
        RouterLink
    ],
    template: `
    <a routerLink="/user/!{{level.originalPublisher ?? this.unknownName}}" class="hover:underline">
        {{level.originalPublisher ?? this.unknownName}}</a>
  `
})
export class OriginalPublisherRouterLink {
  @Input({required: true}) public level: Level = undefined!;
  protected unknownName: string = "Unknown";
}
